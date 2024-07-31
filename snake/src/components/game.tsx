import React, * as react from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './snake';
import { checkIsGameOver } from '../utils/checkIsGameOver';
import Food, { setRandomFruitEmoji } from './food';
import { checkIsFoodEaten } from '../utils/checkIsFoodEaten';
import { FoodPosition } from '../utils/foodPosition';
import Header from './header';

//consts
const SNAKE_INITIAL_POSITION = [{x:10, y:30}];
const FOOD_INITIAL_POSITION = {x:5, y:20};
const GAME_BOUND = {xMin:0, xMax:33, yMin:0, yMax:65};
const MOVE_INTERVAL = 50; //every 50ms the snake moves
const SCORE_INCREMENT = 10;

export default function Game():JSX.Element //function-name:return-value
{
    //<> symbol what is the type of the object (the types are taken from types.ts)
    //() symbol the initial status of the object
    //each const has a setFunc that when is called change the value of the variable
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPause, setIsPause] = React.useState<boolean>(false);
    const [isBorder, setIsBorder] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0);

    const debounceTimeout = React.useRef<number | null>(null);
    
    //the use effect func will be called only if any varibale on the given array changes
    React.useEffect
    (
        () => 
            {
                if (!isGameOver)
                { 
                    //every 50 ms (MOVE_INTERVAL) move the snake
                    const intervalId = setInterval( () => {!isPause && moveSnake();}, MOVE_INTERVAL);
                    return () => clearInterval(intervalId);
                }
            }, 
        [snake, isGameOver, isPause]
    );

    const moveSnake = () =>
    {
        const snakeHead = snake[0];
        const newHead = {...snakeHead}; //copy of snakeHead

        if (checkIsGameOver(snakeHead,snake.slice(1,), isBorder, GAME_BOUND))
        {
            setIsGameOver((prev)=>!prev);
            return;
        }

        switch (direction)
        {
            case Direction.Up:
                newHead.y -= 1; //up meaning going back on y
                if (!isBorder && newHead.y < GAME_BOUND.yMin)
                    newHead.y = GAME_BOUND.yMax;
                break;
            case Direction.Down:
                newHead.y += 1; 
                if (!isBorder && newHead.y > GAME_BOUND.yMax)
                    newHead.y = GAME_BOUND.yMin;
                break;
            case Direction.Left:
                newHead.x -= 1; 
                if (!isBorder && newHead.x < GAME_BOUND.xMin)
                    newHead.x = GAME_BOUND.xMax;
                break;
            case Direction.Right:
                newHead.x += 1; 
                if (!isBorder && newHead.x > GAME_BOUND.xMax)
                    newHead.x = GAME_BOUND.xMin;
                break;
            default:
                break;
        }

        if (checkIsFoodEaten(newHead, food, 2))
        {
            setScore(score + SCORE_INCREMENT);
            setRandomFruitEmoji();
            setFood(FoodPosition(GAME_BOUND.xMax, GAME_BOUND.yMax)); //set food before set snake!
            setSnake([newHead, ...snake]);
        }
        else
        {
            setSnake([newHead, ...snake.slice(0,-1)]);
        }
        
    };

    //the event type is taken from the type.ts file
    const handleGesture = (event:GestureEventType) => //handle the user touch screen (up down left right)
    {
        if (debounceTimeout.current !== null) {
            clearTimeout(debounceTimeout.current);
        }
        //console.log(event.nativeEvent); //this print to the vs terminal
        const {translationX, translationY} = event.nativeEvent;
        //console.log(translationX,translationY); //this print exact number of x y on the screen
        //when you touch the screen the first dot is 0,0 
        //then it changed by the direction as long as you still touch the screen
        debounceTimeout.current = setTimeout(() => {
            if (Math.abs(translationX) > Math.abs(translationY))
            {
                //moving on x -> right-left movement
                if (translationX > 0)
                {
                    //moving to the right
                    if (direction !== Direction.Left)
                        setDirection(Direction.Right);
                        
                }
                else
                {
                    //moving to the left
                    if (direction != Direction.Right)
                        setDirection(Direction.Left);
                }
            }
            else
            {
                if (translationY > 0)
                {
                    //moving down
                    if (direction != Direction.Up)
                        setDirection(Direction.Down);
                }
                else
                {
                    //moving up
                    if (direction != Direction.Down)
                        setDirection(Direction.Up);
                }
            }
        }, 6);
    };

    const checkIfBorders = () => {setIsBorder(!isBorder);}

    const gameOver = () =>
    {
        if (!isGameOver)
            return;
        else
            return ("Game over!");
    };

    const pauseGame = () => {setIsPause(!isPause);};

    const reloadGame = () =>
    {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setScore(0);
        setIsGameOver(false);
        setIsPause(false);
        setDirection(Direction.Right);
        setIsBorder(false);
    };

    return( //do smt whenever the user touch the screen
            // <food> <snake> are from food.tsx and snake.tsx
            //the children of head is the <> inside it
        <PanGestureHandler onGestureEvent={handleGesture}> 
            <SafeAreaView style={styles.container}>
                <Header isPause={isPause} isBorders={isBorder} pauseGame={pauseGame} reloadGame={reloadGame} borders={checkIfBorders}>
                    <Text style={styles.text}>{gameOver()}</Text>
                    <Text style={styles.text}>{score}</Text>
                </Header>
                <View style={styles.boundaries} >
                    <Snake snake={snake} /> 
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
        
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1, //all screen
        backgroundColor: Colors.primary,
        //borderWidth: 1,
    },

    boundaries:
    {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 20,
        //borderBottomLeftRadius: 0,
        //borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    },

    text:
    {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.primary,
        //height: 100
    }
});
