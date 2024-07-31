import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../types/types";
import React from "react";

let FRUIT = "🍎";

export function setRandomFruitEmoji() 
{
    const fruitEmojis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍"];
    const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
    FRUIT = fruitEmojis[randomIndex];
    return;
}

export default function Food({x,y}:Coordinate):JSX.Element
{
    return <Text style={ [{ top: y*10, left: x*10 }, styles.food] }>{FRUIT}</Text>;
}

const styles = StyleSheet.create({
    food:
    {
        width: 50,
        height: 50,
        borderRadius: 15,
        position: 'absolute'
    }
});