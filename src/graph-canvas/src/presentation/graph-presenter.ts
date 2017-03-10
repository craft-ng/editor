import { Graph } from './../graph';
import { Node } from './../node';
import { Viewport } from './viewport';
import { D3Service, D3, Selection } from 'd3-ng2-service';

export class GraphPresenter {

    /**
     *
     */
    constructor(private graph: Graph) {


    }

    presentableNodes(): Iterable<Node> {
        throw new Error('not implemented');
    }

    get viewport(): Viewport {
        throw new Error('not implemented');
    }

    set viewport(viewport: Viewport) {
        throw new Error('not implemented');
    }

    rebuildView() {

    }

    initialize(d3ParentElement: Selection<any, any, any, any>) {

        const svg = d3ParentElement
            .append('svg')
            .classed('graph-canvas-surface', true)
            .attr('viewBox', '0 0 600 400');

            
    }
}