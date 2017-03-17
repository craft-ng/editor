import { Circle } from './../../../graph-canvas/src/geometry/circle';
import { Geometry } from './../../../graph-canvas/src/geometry/geometry';
import { Rectangle } from '../../../graph-canvas/src/geometry/rectangle';
import { Node } from './../../../graph-canvas/src/node';
import { Graph } from './../../../graph-canvas/src/graph';
import { Injectable } from '@angular/core';

@Injectable()
export class GraphService {

  constructor() { }

  loadGraph(): Graph {



    let graph = new Graph();
    graph.nodes = [
      this.createRectangle(10, 10, 40, 20),
      this.createCircle(20, 50, 10)
    ];

    return graph;
  }

  private createRectangle(x: number, y: number, w: number, h: number): Node {
    let node = new Node();
    node.geometry = {
      shape: new Rectangle(x, y, w, h)
    };
    return node;
  }

  private createCircle(r: number, x: number, y: number) {
    let node = new Node();
    node.geometry = {
      shape: new Circle(r, x, y)
    };
    return node;
  }
}
