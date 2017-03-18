import { Circle } from './../geometry/circle';
import { Transform } from './../geometry/transform';
import { Node } from './../node';
import { ViewComponentContext } from './view-component';
import { NodePresenter } from './node-presenter';

export class CirclePresenter implements NodePresenter {

    public getType(): string {
        return 'circle';
    }

    public rebuildView(context: ViewComponentContext, nodes: Node[]) {
        let identityTransform: Transform = {
            getCssTransform: () => ''
        };

        context.parent
            .selectAll('g.circle')
            .data(nodes)
            .enter()
            .append('g')
            .classed('circle', true)
            .attr('transform', (node: Node) => (
                node.geometry.transform == undefined ?
                    identityTransform :
                    node.geometry.transform
            ).getCssTransform())
            .append('circle')
            .attr('cx', node => (<Circle>node.geometry.shape).x)
            .attr('cy', node => (<Circle>node.geometry.shape).y)
            .attr('r', node => (<Circle>node.geometry.shape).radius);
    }
}