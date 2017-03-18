import { ViewComponent, ViewComponentContext, ViewComponentBase, switchTo } from './view-component';

export class GraphComponent extends ViewComponentBase {
    components: ViewComponent[];

    initialize(context: ViewComponentContext) {
        let viewBox = context.graphPresenter.viewport;

        const svg = context.parent
            .append('svg')
            .classed('graph-canvas-surface', true)
            .attr('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);

        this.initializeSubComponents(switchTo(context, svg));
    }

    rebuildView(context: ViewComponentContext) {
        throw new Error('Method not implemented.');
    }
}