import { NodePresenter } from './node-presenter';
import { Rectangle } from './../geometry/rectangle';
import { Node } from './../node';
import { ViewComponent, ViewComponentContext } from './view-component';
import { Transform } from '../geometry/transform';
import * as _ from 'lodash';

export class NodeComponent implements ViewComponent {
    components: ViewComponent[];

    public nodePresenters: NodePresenter[] = [];

    initialize(context: ViewComponentContext) {
        let visibleNodes: Node[] = context.graphPresenter.presentableNodes();

        let groupedVisibleNodes = _.groupBy(visibleNodes, node => node.geometry.shape.getType());

        for (let key of Object.keys(groupedVisibleNodes)) {
            let nodePresenter = this.getPresenter(key);
            if (nodePresenter === undefined) {
                console.log(
                    `No node presenter for geometry type '${key}' was found. 
                    Check that the required presenter is register in the graph presenter.`
                );
            } else {
                let dataSet = groupedVisibleNodes[key];

                nodePresenter.rebuildView(context, dataSet);
            }
        }
    }

    rebuildView(context: ViewComponentContext) {
        throw new Error('Method not implemented.');
    }

    addPresenter(presenter: NodePresenter): this {
        this.nodePresenters.push(presenter);
        return this;
    }

    getPresenter(geometryType: string) {
        return this.nodePresenters
            .find(node => node.getType() === geometryType);
    }
}