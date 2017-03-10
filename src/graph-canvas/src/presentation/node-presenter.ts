import { Node } from './../node';
import { Selection } from 'd3-ng2-service';

export type D3Selection = Selection<any, any, any, any>;

export interface NodePresenter {
    rebuildView(parent: D3Selection);
}

export abstract class NodePresenterBase implements NodePresenter {
    /**
     *
     */
    constructor(public node: Node) {

    }

    abstract initialize(parent: D3Selection);

    abstract
}