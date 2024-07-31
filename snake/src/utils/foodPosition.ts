import { Coordinate } from "../types/types"

export const FoodPosition = (maxX:number, maxY:number):Coordinate =>
{
    return{
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    };
};