import { Node } from './../node';
import { ViewComponentContext } from './view-component';

export interface NodePresenter {
    getType(): string;

    rebuildView(context: ViewComponentContext, nodes: Node[]);
}