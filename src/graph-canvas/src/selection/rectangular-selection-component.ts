import { ViewComponentContext } from './../components/view-component';
import { ViewComponentBase } from '../components/view-component';

export class RectangularSelectionComponent extends ViewComponentBase {

    initialize(context: ViewComponentContext) {
        let viewBox = context.graphPresenter.viewport;

        let brush = context.d3.brush()
            .extent([[viewBox.x, viewBox.y], [viewBox.x + viewBox.width, viewBox.y + viewBox.height]])
            .on('start', () => { console.log('brush start'); })
            .on('brush', () => { console.log('brush'); })
            .on('end', () => { console.log('brush end'); });

        context.parent.append('g')
            .classed('brush', true)
            .call(<any>brush)
            .selectAll('rect');
    }

    rebuildView(context: ViewComponentContext) {
        // context.parent
    }
}