import { Subscription } from "rxjs";
import { EventBus } from "../event-bus";
import {
  BusEvent,
  EventualPayload,
  NewableBusEvent,
} from "../types/bus-event.type";
import { EventBusCallback } from "./event-group-callbacks";
import { EventBusErrorCallback } from "./event-group-error-callback";
import { defaultErrorCallback } from "./default-error-callback";

/**
 * An EventBusGroup allows for using the event bus with a Callback-Interface.
 * The this.on() method allows to register a callback to a certain event type.
 * The rxjs subscription on the EventBus, which is made during the callback registration,
 * will be stored inside the EventBusGroup.
 * This allows for unsubscribing all callback subscriptions at once
 */
export class EventBusGroup {
  private subscriptions: Subscription[] = [];

  constructor(
    private bus: EventBus,
    private errorCallback: EventBusErrorCallback = defaultErrorCallback,
  ) {
  }

  /**
   * Replaces the default error callback function with a custom one
   */
  public setDefaultErrorCallback(callback: EventBusErrorCallback): void {
    this.errorCallback = callback;
  }

  /**
   * I subscribe to the message bus, but only invoke the callback when the event is
   * of the given newable type (ie, it's a Class definition, not an instance).
   * --
   * NOTE: The NewableBusEvent<E, P> enables internal type inference.
   *
   * @param typeFilter
   * @param callback
   * @param callbackContext
   * @returns
   */
  public on<E extends BusEvent<P>, P>(
    typeFilter: NewableBusEvent<E, P>,
    callback: EventBusCallback<P>,
    callbackContext: unknown = null,
    errorCallback?: EventBusErrorCallback,
  ): void {
    const next = (eventPayload: EventualPayload<P>) => {
      try {
        callback.call(callbackContext, eventPayload);
      } catch (error) {
        if (errorCallback) {
          errorCallback.call(callbackContext, errorCallback);
          return;
        }

        this.errorCallback.call(callbackContext, error);
      }
    };

    const sub = this.bus.on$(typeFilter).subscribe(
      {
        next,
        error: (error: unknown) =>
          this.errorCallback.call(callbackContext, error),
      },
    );

    this.subscriptions.push(sub);
  }

  public unsubscribeAll() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
