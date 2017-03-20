import { routes } from './../../../app/app.routing';
export type Callback = (data?: EventData) => void;
export type EventData = any;

export class EventAggregator {

    private _subscriptions: { [event: string]: Callback[]; } = {};

    private throwIfEventIllegal(event: string): void {
        if (!event) {
            throw new Error('Event name must be specified');
        }
    }

    private throwIfCallbackNotAFunction(callback: Callback) {
        if (typeof callback !== 'function') {
            throw new Error('Only functions can be used as callbacks');
        }
    }

    subscribe(event: string, callback: Callback) {
        this.throwIfEventIllegal(event);
        this.throwIfCallbackNotAFunction(callback);

        let subs = this._subscriptions[event];
        if (subs == null) {
            subs = [];
            this._subscriptions[event] = subs;
        }
        subs.push(callback);
    }

    publish(event: string, data?: EventData) {
        this.throwIfEventIllegal(event);

        let subs = this._subscriptions[event];
        if (subs) {
            subs.forEach(sub => {
                try {
                    sub(data);
                }
                catch (exception) {
                    console.error(
                        `Subscriber to event <${event}> threw: \r\n\t ${exception}.\r\nFailing subscriber's body:\r\n\t${sub.toString()}`
                    );
                }
            });
        }
    }

    unsubscribe(event: string, callback?: Callback) {
        this.throwIfEventIllegal(event);

        if (arguments.length === 1) {
            delete this._subscriptions[event];
        } else {
            this.throwIfCallbackNotAFunction(callback);

            let subs = this._subscriptions[event];
            if (subs) {
                let callbackIndex = subs.indexOf(callback);
                if (callbackIndex >= 0) {
                    subs.splice(callbackIndex, 1);
                }
            }
        }
    }
}