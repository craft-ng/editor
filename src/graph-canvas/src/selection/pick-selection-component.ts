import { graphSelection } from './../states';
import { Node } from './../node';
import { ViewComponentContext } from './../components/view-component';
import { ViewComponentBase } from '../components/view-component';
import { Selection, getSelection } from './selection';

export class PickSelectionComponent extends ViewComponentBase {

    initialize(context: ViewComponentContext) {

        let toggleSelection = this.toggleSelection;

        context.parent.selectAll('.gc-node')
            .on('mousedown', function (data: Node, index, group) {
                toggleSelection(data, this, context);
            });
    }

    rebuildView(context: ViewComponentContext) {
        // context.parent
    }

    toggleSelection(data: Node, element, context: ViewComponentContext) {
        let selection = getSelection(graphSelection, context);

        let isSelected = selection.isSelected(data);

        context.d3.select(element)
            .classed('gc-node-selected', !isSelected);
        selection.toggle(data);
    }
}