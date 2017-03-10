import { Geometry } from './../../../graph-canvas/src/geometry/geometry';
import { Rectangle } from '../../../graph-canvas/src/geometry/rectangle';
import { Node } from './../../../graph-canvas/src/node';
import { Graph } from './../../../graph-canvas/src/graph';
import { Injectable } from '@angular/core';

@Injectable()
export class GraphService {

  constructor() { }

  loadGraph(): Graph {

    let node = new Node();
    node.geometry = {
      shape: new Rectangle(10, 10, 40, 20)
    };

    let graph = new Graph();
    graph.nodes = [
      node
    ];

    return graph;
  }
}
