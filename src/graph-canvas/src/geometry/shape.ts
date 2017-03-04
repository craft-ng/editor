import { Class } from './../class';
import { ShapeClass } from './shape-class';

export interface Shape {

    getArea(): number;
    getPerimeter(): number;
    getBoundingShape<T extends Shape>(shapeClass: Class<T>): T;
}