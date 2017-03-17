import { Rectangle } from './../../src/geometry/rectangle';
import { Circle } from './../../src/geometry/circle';

describe('Circle', () => {

    let variousCorrectCircles = [
        { x: 0, y: 0, r: 0, area: 0, perimeter: 0, boundingRect: new Rectangle(0, 0, 0, 0) },
        { x: 0, y: 0, r: 5, area: Math.PI * 5 * 5, perimeter: 2 * Math.PI * 5, boundingRect: new Rectangle(-5, -5, 10, 10) },
        { x: 7, y: -3, r: 3, area: Math.PI * 3 * 3, perimeter: 2 * Math.PI * 3, boundingRect: new Rectangle(4, -6, 6, 6) },
        { x: -3, y: 7, r: 3, area: Math.PI * 3 * 3, perimeter: 2 * Math.PI * 3, boundingRect: new Rectangle(-6, 4, 6, 6) }
    ];

    describe('constructor', () => {

        let circle: Circle;

        beforeEach(() => {
            circle = new Circle(4, 5, 6);
        });

        all('should throw when radius is negative', [-0.1, -1, -100], (radius) => {
            expect(() => new Circle(radius, 4, 5)).toThrowError();
        });

        it('sets radius', () => {
            expect(circle.radius).toBe(4);
        });

        it('sets x', () => {
            expect(circle.x).toBe(5);
        });

        it('sets y', () => {
            expect(circle.y).toBe(6);
        });
    });

    describe('getArea', () => {
        all('calculates area correctly', variousCorrectCircles, circleData => {
            const circle = new Circle(circleData.r, circleData.x, circleData.y);
            expect(circle.getArea()).toBe(circleData.area);
        });
    });

    describe('getPerimeter', () => {
        all('calculates perimeter correctly', variousCorrectCircles, circleData => {
            const circle = new Circle(circleData.r, circleData.x, circleData.y);
            expect(circle.getPerimeter()).toBe(circleData.perimeter);
        });
    });

    describe('getBoundingShape', () => {
        all('calculates bounding Rectangle', variousCorrectCircles, circleData => {
            const circle = new Circle(circleData.r, circleData.x, circleData.y);
            expect(circle.getBoundingShape(Rectangle)).toEqual(circleData.boundingRect);
        });

        all('calculates bounding Circle', variousCorrectCircles, circleData => {
            const circle = new Circle(circleData.r, circleData.x, circleData.y);
            expect(circle.getBoundingShape(Circle)).toEqual(
                new Circle(circleData.r, circleData.x, circleData.y));
        });

        it('should throw when unsupported shape class is specified', () => {
            const circle = new Circle(1, 0, 0);
            expect(() => circle.getBoundingShape(Object)).toThrowError();
        });
    });

    describe('getType', () => {
        it('returns circle', () => {
            expect(new Circle(1, 0, 0).getType()).toBe('circle');
        });
    });
});