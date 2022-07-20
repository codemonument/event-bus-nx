import { EventualPayload } from "../types/bus-event.type";

/**
 * Is called 'CallbackFunction' in original article
 */
export type EventGroupCallback<P> = (eventPayload: EventualPayload<P>) => void;

/**
 * Is called 'CallbackFunction' in original article
 */
export type EventGroupErrorCallback<T> = (error: T) => void;

export function defaultErrorCallback(error: unknown) {
  console.error(
    `[event-bus webcomponent]: An Error was caught while calling a listener callback.
  This is the default ErrorCallbackFunction, which can be replaced by calling setDefaultErrorCallback() on the event-bus dom node,
  or passing the optional 'errorCallback' parameter when calling on(EventType, ...) function.

  Error Details:

  `,
    error,
  );
}
