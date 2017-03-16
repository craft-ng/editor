import { ViewComponent, ViewComponentContext, ViewComponentBase, switchTo } from './view-component';

export class GraphComponent extends ViewComponentBase {
    components: ViewComponent[];

    initialize(context: ViewComponentContext) {

        const svg = context.parent
            .append('svg')
            .classed('graph-canvas-surface', true)
            .attr('viewBox', '0 0 600 400');

        this.initializeSubComponents(switchTo(context, svg));
    }

    rebuildView(context: ViewComponentContext) {
        throw new Error('Method not implemented.');
    }
}