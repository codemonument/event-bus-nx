import { BusEvent } from "./bus-event.type";

/**
 * Is called 'CallbackFunction' in original article
 */
export interface EventBusCallback<E extends BusEvent<P>, P> {
  (event: E): void;
}
