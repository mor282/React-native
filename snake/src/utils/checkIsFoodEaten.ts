import { Coordinate } from "../types/types";

export const checkIsFoodEaten = (head:Coordinate, food:Coordinate, area:number):boolean =>
{
    //distance between the food and the snake
    const distanceY:number = Math.abs(head.y-food.y);
    const distanceX:number = Math.abs(head.x-food.x);
    return (distanceX < area && distanceY < area);
};