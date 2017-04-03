import { graphSelectionAdded, graphSelectionRemoved } from './../events';
import { ViewComponentContext } from './../components/view-component';
import { EventAggregator } from '../event-aggregator/event-aggregator';

export function getSelection(selectionId: string, context: ViewComponentContext): Selection<any> {
    let selection: Selection<any> = context.state[selectionId];
    if (selection == null) {
        context.state[selectionId] = selection = new Selection<any>();

        // Propagate added event to aggregator in the specified context
        selection.on('added', selectionEvent => {
            context.events.publish(graphSelectionAdded, selectionEvent);
        });

        // Propagate removed event to aggregator in the specified context
        selection.on('removed', selectionEvent => {
            context.events.publish(graphSelectionRemoved, selectionEvent);
        });
    }

    return selection;
}

export interface SelectionEventData<T> {
    selection: Selection<T>;
    items: T[];
}

export type SelectionEvent = 'added' | 'removed';

type Callback<T> = (data: SelectionEventData<T>) => void;

interface CallbackInfo<T> {
    event: string;
    method: Callback<T>;
}

export class Selection<T> {
    private _items: Set<T> = new Set();

    private _events: EventAggregator = new EventAggregator();

    constructor(items?: T[]) {
        if (items) {
            this.add(...items);
        }
    }

    get items(): T[] {
        return Array.from(this._items);
    }

    set items(items: T[]) {
        this.clear();
        if (items) {
            this.add(...items);
        }
    }

    isSelected(item: T): boolean {
        return this._items.has(item);
    }

    allSelected(...items: T[]): boolean {
        let areAllItemsSelected = true;
        if (items.length === 0) {
            // neither selector nor deselected
            areAllItemsSelected = undefined;
        } else {
            items.forEach(item => areAllItemsSelected = areAllItemsSelected && this._items.has(item));
        }

        return areAllItemsSelected;
    }

    clear() {
        let removedItems = this.items;
        this._clear();
        this._raiseRemoved(removedItems);
    }

    add(...items: T[]) {
        let addedItems = this._calculateAddedItems(items);
        this._add(items);
        this._raiseAdded(addedItems);
    }

    remove(...items: T[]) {
        let removedItems = this._calculateRemovedItems(items);
        this._remove(items);
        this._raiseRemoved(removedItems);
    }

    private _add(items: T[]) {
        items.forEach(item => this._items.add(item));
    }

    private _remove(items: T[]) {
        items.forEach(item => this._items.delete(item));
    }

    private _clear() {
        this._items.clear();
    }

    private _toggle(items: T[]) {
        let modifiedItems = {
            removed: [],
            added: []
        }
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            if (this.isSelected(item)) {
                modifiedItems.removed.push(item);
                this._remove([item]);
            } else {
                modifiedItems.added.push(item);
                this._add([item]);
            }
        }
        return modifiedItems;
    }

    toggle(...items: T[]) {
        let modifiedItems = this._toggle(items);
        this._raiseRemoved(modifiedItems.removed);
        this._raiseAdded(modifiedItems.added);
    }

    on(event: SelectionEvent, callback: Callback<T>) {
        this._events.subscribe(event, callback);
    }

    off(event: SelectionEvent, callback: Callback<T>) {
        this._events.unsubscribe(event, callback);
    }

    raise(event: SelectionEvent, data: SelectionEventData<T>) {
        this._events.publish(event, data);
    }

    private _calculateAddedItems(items: T[]) {
        return items.filter(item => !this._items.has(item));
    }

    private _calculateRemovedItems(items: T[]) {
        return items.filter(item => this._items.has(item));
    }

    private _raiseRemoved(removedItems: T[]) {
        if (removedItems.length > 0) {
            let eventData = <SelectionEventData<T>>{
                selection: this,
                items: removedItems
            };
            this.raise('removed', eventData);
        }
    }

    private _raiseAdded(addedItems: T[]) {
        if (addedItems.length > 0) {
            let eventData = <SelectionEventData<T>>{
                selection: this,
                items: addedItems
            };
            this.raise('added', eventData);
        }
    }
}
