import { GraphPresenter } from './graph-presenter';
import { Selection } from 'd3-ng2-service';

export type D3Selection = Selection<any, any, any, any>;

export function switchTo(originalContext: ViewComponentContext, newParent: D3Selection): ViewComponentContext {
    return {
        graphPresenter: originalContext.graphPresenter,
        parent: newParent
    };
}

export interface ViewComponentContext {
    graphPresenter: GraphPresenter,
    parent: D3Selection
}

export interface ViewComponent {
    initialize(context: ViewComponentContext);
    rebuildView(context: ViewComponentContext);
    components: ViewComponent[];
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