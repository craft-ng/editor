export type Callback = (data?: EventData) => void;
export type EventData = any;

export class EventAggregator {

    private _subscriptions: { [event: string]: Callback[]; } = {};

    subscribe(event: string, callback: Callback) {
        throw new Error();
    }

    publish(event: string, data?: EventData) {
        throw new Error();
    }

    unsubscribe(event: string, callback?: Callback) {
        throw new Error();
    }
}