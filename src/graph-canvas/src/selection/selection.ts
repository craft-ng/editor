import { ViewComponentContext } from './../components/view-component';
import * as _ from 'lodash';

const selectionId = 'selection';

export function getSelection(context: ViewComponentContext): Selection<any> {
    let selection: Selection<any> = context.shared[selectionId];
    if (selection == null) {
        context.shared[selectionId] = selection = new Selection<any>();
    }

    return selection;
}

export class Selection<T> {
    private _items: T[] = [];

    constructor(items?: T[]) {
        this.add(...items);
    }

    get items(): T[] {
        return this._items;
    }

    set items(items: T[]) {
        this.clear();
        if (items) {
            this.add(...items);
        }
    }

    isSelected(item: T): boolean {
        return _.includes(this.items, item);
    }

    allSelected(...items: T[]): boolean {
        return _.difference(items, this.items).length === 0;
    }

    clear() {
        this._items = [];
    }

    add(...items: T[]) {
        let newItems = _.difference(items, this.items);
        return this.items.push(...newItems);
    }

    remove(...items: T[]) {
        this.items = _.difference(this.items, items);
    }

    toggle(...items: T[]) {
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            if (this.isSelected(item)) {
                this.remove(item);
            } else {
                this.add(item);
            }
        }
    }
}