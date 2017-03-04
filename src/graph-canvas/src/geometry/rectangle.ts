import { Shape } from './shape';
import { Class } from './../class';

export class Rectangle implements Shape {
    /**
     *Constructs a new rectangle with the specified position anddimensions
     */
    constructor(public x: number, public y: number, public width: number, public height: number) {


    }

    public getPerimeter(): number {
        return this.width * 2 + this.height * 2;
    }

    public getArea(): number {
        throw 'Not Implemented';
    }

    public getBoundingShape<T extends Shape>(shapeClass: any | Class<T>): T {
        if (shapeClass === Rectangle) {
            console.log('rect');
        }

        throw new Error('Specified bounding shape is not supported for this shape');
    }
}