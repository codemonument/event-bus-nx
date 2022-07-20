/**
 * I am the base-class for all of the events that this application pushes onto the
 * EventBus. The only guarantee that this class makes is a read-only property called `type`.
 *
 * Was called 'Event' in original Article
 */
export abstract class BusEvent {
  public abstract readonly type: string;
}
