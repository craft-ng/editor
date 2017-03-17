import { Rectangle } from './../../src/geometry/rectangle';

describe('Rectangle', () => {

    let variousCorrectRectangleCases = [
        { x: 10, y: 11, w: 0, h: 0, perimeter: 0, area: 0 },
        { x: 10, y: 11, w: 0, h: 13, perimeter: 26, area: 0 },
        { x: 10, y: 11, w: 12, h: 0, perimeter: 24, area: 0 },
        { x: 10, y: 11, w: 12, h: 13, perimeter: 50, area: 156 },
        { x: -8, y: 16, w: 12, h: 13, perimeter: 50, area: 156 },
        { x: -8, y: 16, w: 10, h: 10, perimeter: 40, area: 100 }
    ];

    describe('constructor', () => {
        let rectangle: Rectangle;

        beforeEach(() => {
            rectangle = new Rectangle(10, 11, 12, 13);
        });

        it('should create', () => {
            expect(rectangle).toBeTruthy();
        });

        it('should set x', () => {
            expect(rectangle.x).toBe(10);
        });

        it('should set y', () => {
            expect(rectangle.y).toBe(11);
        });

        it('should set width', () => {
            expect(rectangle.width).toBe(12);
        });

        it('should set height', () => {
            expect(rectangle.height).toBe(13);
        });

        all('should throw when width is negative', [-0.1, -1, -100], (width) => {
            expect(() => new Rectangle(10, 20, width, 100)).toThrowError();
        });

        all('should throw when height is negative', [-0.1, -1, -100], (height) => {
            expect(() => new Rectangle(10, 20, 100, height)).toThrowError();
        });
    });

    describe('getPerimiter', () => {

        all('should calculate perimeter', variousCorrectRectangleCases, (rectData) => {
            const rectangle = new Rectangle(rectData.x, rectData.y, rectData.w, rectData.h);
            expect(rectangle.getPerimeter()).toBe(rectData.perimeter);
        });
    });

    describe('getArea', () => {
        all('should calculate area', variousCorrectRectangleCases, (rectData) => {
            const rectangle = new Rectangle(rectData.x, rectData.y, rectData.w, rectData.h);
            expect(rectangle.getArea()).toBe(rectData.area);
        });
    });

    describe('getBoundingShape', () => {
        all('should calculate bounding Rectangle', variousCorrectRectangleCases, (rectData) => {
            const rectangle = new Rectangle(rectData.x, rectData.y, rectData.w, rectData.h);
            expect(rectangle.getBoundingShape(Rectangle)).toEqual(
                new Rectangle(rectData.x, rectData.y, rectData.w, rectData.h));
        });

        it('should throw when unsupported shape class is specified', () => {
            const rectangle = new Rectangle(0, 0, 10, 10);
            expect(() => rectangle.getBoundingShape(Object)).toThrowError();
        });
    });

    describe('getType', () => {
        it('returns rectangle', () => {
            expect(new Rectangle(0, 0, 1, 1).getType()).toBe('rectangle');
        });
    });
});