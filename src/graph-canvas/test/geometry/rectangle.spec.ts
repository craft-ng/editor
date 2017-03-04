import { Rectangle } from './../../src/geometry/rectangle';
// import { all } from 'jasmine-data_driven_tests';

import { all } from './../../../jasmine-cases/cases';

describe('Rectangle', () => {

    describe('constructor', () => {
        let rectangle: Rectangle;

        beforeEach(() => {
            rectangle = new Rectangle(10, 11, 12, 13)
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

        all('should throw when width is non-positive', [0, -0.1, -1, -100], (width) => {
            expect(() => new Rectangle(10, 20, width, 100)).toThrow();
        });

        all('should throw when height is non-positive', [0, -0.1, -1, -100], (height) => {
            expect(() => new Rectangle(10, 20, 100, height)).toThrow();
        });
    });

    describe('getPerimiter', () => {

        all('should calculate perimeter', [
            { x: 10, y: 11, w: 12, h: 13, perimeter: 2 * 12 + 2 * 13 },
            { x: -8, y: 16, w: 12, h: 13, perimeter: 2 * 12 + 2 * 13 },
            { x: -8, y: 16, w: 10, h: 10, perimeter: 40 }
        ], (rectData) => {
            let rectangle = new Rectangle(rectData.x, rectData.y, rectData.w, rectData.h);
            expect(rectangle.getPerimeter()).toBe(rectData.perimeter);
        });
    });
});