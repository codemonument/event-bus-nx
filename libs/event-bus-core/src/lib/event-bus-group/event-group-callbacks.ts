import { EventualPayload } from "../types/bus-event.type";

/**
 * Is called 'CallbackFunction' in original article
 */
export type EventGroupCallback<P> = (eventPayload: EventualPayload<P>) => void;

/**
 * Is called 'CallbackFunction' in original article
 */
export type EventGroupErrorCallback<T> = (error: T) => void;
