import { Fragment } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";

interface snakeProps
{
    snake: Coordinate[];
};

export default function Snake ({snake}:snakeProps):JSX.Element
{
    //we want to iterate over each point of the snake (map means iterate?)
    // left: //means we will move 10 to the left/right side depands if x is + or -
    // up: same
    return (
        <Fragment>
            {snake.map((segment:Coordinate, index:number) => {
                const segmentStyle = 
                {
                    top: segment.y * 10, //must be top!
                    left: segment.x * 10,
                };
                return <View key={index} style={[styles.snake, segmentStyle]} />;
            })}
        </Fragment>
    );
}

const styles = StyleSheet.create({
  snake:
  {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    position: 'absolute'
  }  
});