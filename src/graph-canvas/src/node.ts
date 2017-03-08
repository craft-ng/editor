import { PropertySet } from './property-set';
import { Geometry } from './geometry/geometry';

export class Node {
    properties: PropertySet = {};
    geometry: Geometry;
}