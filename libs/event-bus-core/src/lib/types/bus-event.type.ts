export type EventualPayload<P> = P extends void ? void : P;

/**
 * I am the base-class for all of the events that this application pushes onto the
 * EventBus. The only guarantee that this class makes is a read-only property called `type`.
 *
 * This class has been called 'Event' in original Article.
 *
 * It also allows for a payload being passed into into it.
 * Can be disabled when not needed by simply extending like this with `void`:
 *
 * class EventWithoutPayload extends BusEvent<void> {
 *   public type = "EventWithoutPayload";
 * }
 *
 * @type P === Payload Type
 */
export abstract class BusEvent<P> {
  public abstract readonly type: string;
  constructor(public readonly payload: EventualPayload<P>) {}
}

/**
 * Allows to ensure, that a certain type
 * - can be instantiated with calling `new`
 *   (this is needed to be able to use the type in question with `instanceof`)
 * - has a parameter `payload` which is of type P, unles
 * - P is `void`, in this case it's not allowed to pass anything to this constructor!
 *   (expressed via the conditional `never` type)
 */
export interface NewableBusEvent<E extends BusEvent<P>, P> {
  new (payload: EventualPayload<P>): E;
}
