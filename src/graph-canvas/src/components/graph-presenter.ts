import { ViewComponentContext } from './../components/view-component';
import { NodePresenter } from './node-presenter';
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
        return { x: 0, y: 0, width: 600, height: 400 };
    }

    set viewport(viewport: Viewport) {
        throw new Error('not implemented');
    }

    rebuildView() {

    }

    initialize(context: ViewComponentContext) {

        for (let component of this.components) {
            component.initialize(context);
        }
    }
}