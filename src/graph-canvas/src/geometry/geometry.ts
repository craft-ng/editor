import { Shape } from './shape';
import { Transform } from './transform';

export interface Geometry {
    shape: Shape;
    transform?: Transform;
}