import { EventualPayload } from "./bus-event.type";

/**
 * Is called 'CallbackFunction' in original article
 */
export type EventBusCallback<P> = (eventPayload: EventualPayload<P>) => void;
