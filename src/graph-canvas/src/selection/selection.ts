import { ViewComponentContext } from './../components/view-component';

export function getSelection(selectionId: string, context: ViewComponentContext): Selection<any> {
    let selection: Selection<any> = context.state[selectionId];
    if (selection == null) {
        context.state[selectionId] = selection = new Selection<any>();
    }

    return selection;
}

export interface SelectionEventData<T> {
    selectionId: string;
    selection: Selection<T>;
    items: T[];
}

export type SelectionEvent = 'added' | 'removed';

type Callback<T> = (data: SelectionEventData<T>) => void;

interface CallbackInfo<T> {
    event: string;
    method: CallbackInfo<T>;
}

export class Selection<T> {
    private _items: Set<T> = new Set();

    public callbacks: CallbackInfo<T>[];

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
        this._items.clear();
    }

    add(...items: T[]) {
        items.forEach(item => this._items.add(item));
    }

    remove(...items: T[]) {
        items.forEach(item => this._items.delete(item));
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

    on(event: SelectionEvent, callback: Callback<T>) {

    }

    off(event: SelectionEvent, callback: Callback<T>) {

    }
}