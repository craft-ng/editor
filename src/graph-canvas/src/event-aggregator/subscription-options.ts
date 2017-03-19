import { Callback } from './event-aggregator';

export interface SubscriptionOptions {
    priority?: number;
    stopOnError?: boolean;
    times?: number;
    onUnhandledError?: Callback
}