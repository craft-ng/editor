import { NodePresenter } from './node-presenter';
import { Rectangle } from './../geometry/rectangle';
import { Transform } from './../geometry/transform';
import { Node } from './../node';
import { ViewComponentContext } from './view-component';

export class RectanglePresenter implements NodePresenter {

    public getType(): string {
        return 'rectangle';
    }

    public rebuildView(context: ViewComponentContext, nodes: Node[]) {
        let identityTransform: Transform = {
            getCssTransform: () => ''
        };

        let nodeGroup = context.parent
            .selectAll('g.rect')
            .data(nodes)
            .enter()
            .append('g')
            .classed('rect', true)
            .attr('transform', (node: Node) => (
                node.geometry.transform == undefined ?
                    identityTransform :
                    node.geometry.transform
            ).getCssTransform());

        nodeGroup
            .append('rect')
            .attr('x', node => (<Rectangle>node.geometry.shape).x)
            .attr('y', node => (<Rectangle>node.geometry.shape).y)
            .attr('width', node => (<Rectangle>node.geometry.shape).width)
            .attr('height', node => (<Rectangle>node.geometry.shape).height);
    }
}