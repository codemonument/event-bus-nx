import { filter, map, Observable, Subject } from "rxjs";
import {
  BusEvent,
  EventualPayload,
  NewableBusEvent,
} from "./types/bus-event.type";
import { SimpleNewable } from "./types/simple-newable.type";

export class EventBus {
  private eventStream: Subject<unknown> = new Subject<unknown>();

  // --- PUBLIC FUNCTIONS ---

  /**
   * I filter the event stream to get only events of one type as observable
   * @param typeFilter The event type to listen to
   *        must extend from BusEvent<R>
   *
   * @returns either the Event E or the Payload of E, typed P
   * Note: These types do not be passed manually, they will be inferenced by TS
   */
  public on$<E extends BusEvent<P>, P>(
    typeFilter: NewableBusEvent<E, P>,
  ): Observable<EventualPayload<P>> {
    return this.eventStream.pipe(
      // Filters all events on the event stream and returns only these, which map the typeFilter
      filter((event: unknown): event is E => {
        return event instanceof typeFilter;
      }),
      // Maps the events to their payloads for easier consumption
      // Note: The return type must be EventualPayload here
      //       to not get `P | undefined` as return type of this map
      map((event): EventualPayload<P> =>
        (event.payload !== undefined)
          ? event.payload
          : undefined as EventualPayload<P>
      ),
    );
  }

  /**
   * I push the given event onto the message bus.
   *
   * @param event
   */
  public emit(event: unknown): void {
    this.eventStream.next(event);
  }

  /**
   * CAUTION: PLEASE BE SURE WHAT YOU DO WHEN YOU USE THIS!
   *
   * Returns the whole eventStream as observable.
   */
  public get eventStream$() {
    return this.eventStream.asObservable();
  }
}
