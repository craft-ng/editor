import { Shape } from './shape';
import { Class } from './../class';

export class Rectangle implements Shape {
    /**
     *Constructs a new rectangle with the specified position anddimensions
     */
    constructor(public x: number, public y: number, public width: number, public height: number) {
        if (width <= 0 || height <= 0) {
            throw new Error('Both dimensions of a rectangle must be positive numbers');
        }
    }

    public getPerimeter(): number {
        return this.width * 2 + this.height * 2;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getBoundingShape<T extends Shape>(shapeClass: any | Class<T>): T {
        if (shapeClass === Rectangle) {
            return <any>new Rectangle(this.x, this.y, this.width, this.height);
        }
        else {
            throw new Error('Specified bounding shape is not supported for this shape');
        }
    }

    /**
     * getType
     */
    public getType(): string {
        return 'rectangle';
    }
}