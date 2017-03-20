import { EventAggregator } from '../../src/event-aggregator/event-aggregator';

describe('EventAggregator', () => {

    describe('constructor', () => {
        it('creates instance', () => {
            expect(() => new EventAggregator()).toBeTruthy();
        });
    });

    let eventAggregator: EventAggregator;
    let callCount: number;
    let beforeEachInitializeInstance = () => {
        beforeEach(() => {
            eventAggregator = new EventAggregator();
            callCount = 0;
        });
    };

    let emptyCallback = () => { };
    let incrementingCallback = () => callCount++;;

    let illegalEventNames = [undefined, null, ''];
    let illegalCallbacks = [undefined, null, 10, 'text', { type: 'object' }];

    describe('subscribe', () => {

        beforeEachInitializeInstance();

        all('throws when event name is not specified', illegalEventNames, (event) => {
            expect(() => eventAggregator.subscribe(event, emptyCallback))
                .toThrowError('Event name must be specified');
        });

        all('throws when a non-function callback is specified', illegalCallbacks, (callback: any) => {
            expect(() => eventAggregator.subscribe('event', callback))
                .toThrowError('Only functions can be used as callbacks');
        });
    });

    describe('unsubscribe', () => {

        beforeEachInitializeInstance();

        all('throws when event name is not specified', illegalEventNames, (event) => {
            expect(() => eventAggregator.unsubscribe(event, emptyCallback))
                .toThrowError('Event name must be specified');
        });

        all('throws when a non-function callback is specified', illegalCallbacks, (callback: any) => {
            expect(() => eventAggregator.unsubscribe('event', callback))
                .toThrowError('Only functions can be used as callbacks');
        });

        it('does not remove subscriptions from events other than specified', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.subscribe('2', incrementingCallback);
            eventAggregator.unsubscribe('1', incrementingCallback);
            eventAggregator.publish('2');

            expect(callCount).toBe(1);
        });

        it('does not remove subscriptions from events other than specified when callback is not specified', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.subscribe('2', incrementingCallback);
            eventAggregator.unsubscribe('1');
            eventAggregator.publish('2');

            expect(callCount).toBe(1);
        });

        it('removes the specified subscribed callback', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.subscribe('2', incrementingCallback);
            eventAggregator.unsubscribe('1', incrementingCallback);
            eventAggregator.publish('1');

            expect(callCount).toBe(0);
        });

        it('removes all subscriptions to the specified event, if no callback is specified', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.unsubscribe('1');
            eventAggregator.publish('1');

            expect(callCount).toBe(0);
        });
    });

    describe('publish', () => {

        beforeEachInitializeInstance();

        all('throws when event name is not specified', illegalEventNames, (event) => {
            expect(() => eventAggregator.publish(event))
                .toThrowError('Event name must be specified');
        });

        it('calls all subscriptions to the specified event', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.publish('1');

            expect(callCount).toBe(2);
        });

        it('passes data to subscribers', () => {
            let passedData = { prop: 'test' };
            let receivedData;
            eventAggregator.subscribe('1', (data) => { receivedData = data; });
            eventAggregator.publish('1', passedData);

            expect(receivedData).toBe(passedData);
        });

        it('does not call subscriptions to other events', () => {
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.publish('2');

            expect(callCount).toBe(0);
        });

        it('calls subsequent subscriptions even if an earlier subscription throws', () => {
            eventAggregator.subscribe('1', () => { throw new Error('Purposeful error in the callback'); });
            eventAggregator.subscribe('1', incrementingCallback);
            eventAggregator.publish('1');

            expect(callCount).toBe(1);
        });
    });
});