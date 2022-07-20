import { filter, Observable, Subject } from "rxjs";
import { TypeDiscriminator } from "./types/type-discriminator";

export class EventBus {
  private eventStream: Subject<unknown> = new Subject<unknown>();

  // --- PUBLIC FUNCTIONS ---

  /**
   * I filter the event stream to get only events of one type as observable
   * @param typeFilter The event type to listen to
   * @returns
   */
  public on$<T>(typeFilter: TypeDiscriminator<T>): Observable<T> {
    return this.eventStream.pipe(
      filter((event: unknown): event is T => {
        return event instanceof typeFilter;
      }),
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
   * PLEASE BE SURE WHAT YOU DO WHEN YOU USE THIS!
   * Return the whole eventStream as observable
   */
  public get eventStream$() {
    return this.eventStream.asObservable();
  }
}
