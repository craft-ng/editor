import { ViewComponent, ViewComponentContext } from './view-component';
import { Transform } from '../geometry/transform';
import { groupBy } from 'lodash';

export class NodeComponent implements ViewComponent {
    components: ViewComponent[];

    initialize(context: ViewComponentContext) {
        let presentableNodes = context.graphPresenter.presentableNodes().map(node => ({
            node: node,
            //edgeRight: node.radiusX
        }));

        let identityTransform: Transform = {
            getCssTransform: () => ''
        };

        context.parent
            .selectAll('ellipse')
            .data(presentableNodes)
            .enter()
            .append('g')
            .attr('transform', data => (data.node.geometry.transform == undefined ? identityTransform : data.node.geometry.transform).getCssTransform());
        // .attr('transform', data => `translate(${data.node.centerX},${data.node.centerY})`);

    }
    rebuildView(context: ViewComponentContext) {
        throw new Error('Method not implemented.');
    }


}