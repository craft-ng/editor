import { Graph } from './../graph';
import { Node } from './../node';
import { Viewport } from './viewport';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { ViewComponent, D3Selection } from './view-component';

export class GraphPresenter {

    public components: ViewComponent[] = [];

    /**
     *
     */
    constructor(public graph: Graph) {


    }

    presentableNodes(): Node[] {
        return this.graph.nodes;
    }

    get viewport(): Viewport {
        throw new Error('not implemented');
    }

    set viewport(viewport: Viewport) {
        throw new Error('not implemented');
    }

    rebuildView() {

    }

    initialize(d3ParentElement: D3Selection) {

        for (let component of this.components) {
            component.initialize({ graphPresenter: this, parent: d3ParentElement });
        }
    }


}