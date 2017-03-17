import { Rectangle } from './rectangle';
import { Class } from './../class';
import { Shape } from './shape';

export class Circle implements Shape {

    constructor(public radius: number, public x: number, public y: number) {
        if (radius < 0) {
            throw new Error('Radius of a circle must not be null');
        }
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    public getBoundingShape<T extends Shape>(shapeClass: any | Class<T>): T {
        if (shapeClass === Rectangle) {
            return <any>new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else if (shapeClass === Circle) {
            return <any>new Circle(this.radius, this.x, this.y);
        } else {
            throw new Error('Specified bounding shape is not supported')
        }
    }

    public getType(): string {
        return 'circle';
    }
}