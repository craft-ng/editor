import { Callback } from './event-aggregator';
import { SubscriptionOptions } from './subscription-options';
export interface Subscription{
    callback : Callback;
    options?: SubscriptionOptions;    
    
}