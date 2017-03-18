import { GraphPresenter } from './graph-presenter';
import { Selection, D3 } from 'd3-ng2-service';

export type D3Selection = Selection<any, any, any, any>;

export function switchTo(originalContext: ViewComponentContext, newParent: D3Selection): ViewComponentContext {
    return {
        d3: originalContext.d3,
        graphPresenter: originalContext.graphPresenter,
        parent: newParent,
        shared: originalContext.shared
    };
}

export interface ViewComponentContext {
    d3: D3;
    graphPresenter: GraphPresenter,
    parent: D3Selection,
    shared: {}
}

export interface ViewComponent {
    components: ViewComponent[];
    initialize(context: ViewComponentContext);
    rebuildView(context: ViewComponentContext);
}

export abstract class ViewComponentBase implements ViewComponent {
    components: ViewComponent[];

    protected initializeSubComponents(context: ViewComponentContext) {
        for (let component of this.components) {
            component.initialize(context);
        }
    }

    initialize(context: ViewComponentContext) {

    }

    rebuildView(context: ViewComponentContext) {
        throw new Error('Method not implemented.');
    }

    component(component: ViewComponent): this {
        if (this.components == undefined) {
            this.components = [];
        }
        this.components.push(component);
        return this;
    }
}