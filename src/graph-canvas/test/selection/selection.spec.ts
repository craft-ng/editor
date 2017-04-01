import { ViewComponentContext } from './../../src/components/view-component';
import { Selection, getSelection, SelectionEventData } from './../../src/selection/selection';

let createSelectionForCallbackTests = () => {
    let selection = new Selection();
    spyOn(selection, 'on');
    return selection;
};

describe('getSelection', () => {
    let context: ViewComponentContext;
    beforeEach(() => {
        context = {
            d3: undefined,
            graphPresenter: undefined,
            parent: undefined,
            state: {}
        }
    });

    it('returns new selection when none existed before', () => {
        let selection = getSelection('id', context);
        expect(selection).toBeTruthy();
    });

    it('gets the same selection on the second call', () => {
        let selectionOne = getSelection('id', context);
        let selectionTwo = getSelection('id', context);
        expect(selectionOne).toBe(selectionTwo);
    });

    it('returns new selection for every selection ID', () => {
        let selectionOne = getSelection('id', context);
        let selectionTwo = getSelection('id2', context);
        expect(selectionOne).not.toBe(selectionTwo);
        expect(selectionTwo).toBeTruthy();
    });
});

describe('Selection', () => {
    describe('constructor', () => {
        it('can be initialized without items', () => {
            let selection = new Selection();
            expect(selection).toBeTruthy();
            expect(selection.items).toEqual([]);
        });

        it('can be initialized with empty item array', () => {
            let selection = new Selection([]);
            expect(selection).toBeTruthy();
            expect(selection.items).toEqual([]);
        });

        it('can be initialized with items', () => {
            let selection = new Selection([1, 2]);
            expect(selection).toBeTruthy();
            expect(selection.items).toEqual([1, 2]);
        });
    });

    describe('items', () => {
        let items = [
            { set: [1, 'abc'], expectedGet: [1, 'abc'] },
            { set: [], expectedGet: [] },
            { set: undefined, expectedGet: [] },
            { set: null, expectedGet: [] },
            { set: 0, expectedGet: [] }
        ];

        all('returns set items', items, (item) => {
            let selection = new Selection();
            selection.items = <any>item.set;
            expect(selection.items).toEqual(item.expectedGet);
        });

        it('calls change callback when changed', () => {
            let selection = createSelectionForCallbackTests();
            expect(selection.changed).toHaveBeenCalled()
        });

        it('does not call change callback when not changed', () => {
            throw new Error('not implemented');
        });
    });

    describe('isSelected', () => {
        let items = {
            selected: [1, 3, 4, 'item'],
            notSelected: [null, undefined, 0, 2, 'item2']
        };

        it('returns true for selected items', () => {
            let selection = new Selection(items.selected);
            items.selected.forEach(selectedItem => {
                expect(selection.isSelected(selectedItem)).toBeTruthy();
            });
        });

        it('returns false for not selected items', () => {
            let selection = new Selection(items.selected);
            items.notSelected.forEach(notSelectedItem => {
                expect(selection.isSelected(notSelectedItem)).toBeFalsy();
            });
        });
    });

    describe('allSelected', () => {
        let items = [
            { selected: [1, 2, 3], check: [2, 1, 3], result: true },
            { selected: [1, 2, null], check: [2, 1, null], result: true },
            { selected: [1, 2, undefined], check: [2, 1, undefined], result: true },
            { selected: [1, 2, ''], check: ['', 1, 2], result: true },
            { selected: [1, 2, 'item1'], check: ['item1', 2], result: true },

            { selected: [1, 2, 3], check: [1, 2, 3, 4], result: false },
            { selected: [1, 2, 3], check: [1, 2, null], result: false },
            { selected: [1, 2, 3], check: [1, 2, undefined], result: false },
            { selected: [1, 2, 3], check: [1, 2, ''], result: false },
            { selected: [1, 3], check: [1, 2], result: false }
        ];

        all('returns value indicating whether all specified items are selected', items, (item) => {
            let selection = new Selection(item.selected);
            expect(selection.allSelected(...item.check)).toBe(item.result);
        });

        it('returns undefined if empty array is specified', () => {
            let selection = new Selection([1, 2]);
            expect(selection.allSelected(...[])).toBeUndefined();
        });

        it('returns undefined if empty array is specified and current selection is empty', () => {
            let selection = new Selection([]);
            expect(selection.allSelected(...[])).toBeUndefined();
        });
    });

    describe('clear', () => {
        it('makes the selection empty', () => {
            let selection = new Selection([1, 2]);
            selection.clear();
            expect(selection.items).toEqual([]);
        });

        it('calls change callback when changed', () => {
            throw new Error('not implemented');
        });

        it('does not call change callback when not changed', () => {
            throw new Error('not implemented');
        });
    });

    describe('add', () => {
        it('adds only items not present in selection', () => {
            let selection = new Selection([1, 2]);
            selection.add(1, 3, 4);
            expect(selection.items).toEqual([1, 2, 3, 4]);
        });

        it('calls change callback when changed', () => {
            throw new Error('not implemented');
        });

        it('does not call change callback when not changed', () => {
            throw new Error('not implemented');
        });
    });

    describe('toggle', () => {
        it('reverts selection', () => {
            let selection = new Selection([1, 2]);
            selection.toggle(1, 3, 4);
            expect(selection.items).toEqual([2, 3, 4]);
        });

        it('selects items originally not in selection', () => {
            let selection = new Selection([]);
            selection.toggle(1);
            expect(selection.items).toEqual([1]);
        });

        it('has no effect if there are no items in selection and no items to toggle', () => {
            let selection = new Selection([]);
            selection.toggle();
            expect(selection.items).toEqual([]);
        });

        it('calls change callback when changed', () => {
            throw new Error('not implemented');
        });

        it('does not call change callback when not changed', () => {
            throw new Error('not implemented');
        });
    });

    describe('raise', () => {
        it('calls all appropriate callbacks', () => {
            let selection = new Selection();
            let callbackObject = {
                callback: (data: SelectionEventData<any>) => { }
            };
            spyOn(callbackObject, 'callback');
            selection.on('added', callbackObject.callback);

            let data: SelectionEventData<any> = {
                selectionId: 'selection',
                selection: selection,
                items: [1, 2]
            };
            selection.raise('added', data);
            selection.raise('removed', data);

            expect(callbackObject.callback).toHaveBeenCalledTimes(1);
            expect(callbackObject.callback).toHaveBeenCalledWith('added', data);
        });

        it('does not fail if no change callbacks are specified', () => {
            throw new Error('not implemented');
        });
    });

    describe('off', () => {
        it('removes the specified callback', () => {
            throw new Error('not implemented');
        });

        it('does not fail if the specified callback was not registered', () => {
            throw new Error('not implemented');
        });
    });
});