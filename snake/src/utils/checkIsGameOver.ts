import { View } from "react-native";
import { Coordinate } from "../types/types";

interface borders
{
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};

//(get):return => {do}
export const checkIsGameOver = (snakeHaed:Coordinate, snake:Coordinate[], isBorder:boolean, GAME_BOUND:borders):boolean => 
    {
        //check if snake touch borders
        if (isBorder)
        {
            if (snakeHaed.x > GAME_BOUND.xMax || snakeHaed.x < GAME_BOUND.xMin || 
                snakeHaed.y > GAME_BOUND.yMax || snakeHaed.y < GAME_BOUND.yMin)
                return true;
        }

        //check if snake touch itself
        let snakeTouchItself = false;
        snake.map((segment:Coordinate) => 
            {
                if (segment.x == snakeHaed.x && segment.y == snakeHaed.y)
                {
                    snakeTouchItself = true;
                    return; //break the loop
                }
            })
        return snakeTouchItself;
    }