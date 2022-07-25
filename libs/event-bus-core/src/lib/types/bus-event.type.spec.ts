import { BusEvent } from "./bus-event.type";
import {
  expectAssignable,
  expectError,
  expectNotAssignable,
  expectType,
} from "tsd";

/**
 * For testing events without payload
 */
class PlainEvent extends BusEvent<void> {
  public type = "PlainEvent";
}

/** #
 * For testing events with payload
 */
interface DemoPayload {
  name: string;
}
class EventWithPayload extends BusEvent<DemoPayload> {
  public type = "EventWithPayload";
}

describe(`bus-event.type`, () => {
  /**
   * IF PlainEvent extends from BusEvent<void>
   * BusEvent allows the user of PlainEvent
   * to *not* provide a param to the constructor when instantiating it.
   */
  it(`should allow event construction without payload (=void)`, () => {
    const event = new PlainEvent();
    expect(event).toBeDefined();
    expectType<void>(event.payload);
    expectType<string>(event.type);

    // TODO: Test while using this event bus library, whether defining event.payload as void is enough
    // or if assignability to undefined is very useful
    expectNotAssignable<undefined>(event.payload);
  });

  /**
   * IF EventWithPayload extends BusEvent with any other type than void (let's call it T),
   * the user of EventWithpayload is forced to provide a value of type T.
   */
  it(`should allow events with payload (=any)`, () => {
    const payload: DemoPayload = { name: "Bob" };
    // Note: If you remove the param, typescript will complain,
    // that you need to provide a value for the payload!
    const event = new EventWithPayload(payload);
    expect(event.payload).toStrictEqual(payload);
  });

  it(`PlainEvent should be compareable with instanceof`, () => {
    const event = new PlainEvent();
    expect(event instanceof PlainEvent).toBeTruthy();
  });

  it(`EventWithPayload should be compareable with instanceof`, () => {
    const payload: DemoPayload = { name: "Bob" };
    const event = new EventWithPayload(payload);
    expect(event instanceof EventWithPayload).toBeTruthy();
  });

  // TODO: Maybe the NewableXXX Stuff is not testable in this manner (since plain instanceof works directly)
  // Maybe test this Newable behavior in event-bus.spec
  //
  // it.skip(`PlainEvent should be assignable to NewableBusEvent`, () => {
  //   const event = new PlainEvent();
  //   const newable: NewableBusEvent<PlainEvent, void> = event;
  //   // const newable: SimpleNewable<PlainEvent> = event;

  //   expect(newable).toBeDefined();
  // });

  // it.skip(`EventWithPayload should be assignable to NewableBusEvent`, () => {
  //   const payload: DemoPayload = { name: "Bob" };
  //   const event = new EventWithPayload(payload);

  //   const newable: NewableBusEvent<EventWithPayload, DemoPayload> = event;
  //   // const newable: SimpleNewable<EventWithPayload> = event;

  //   expect(newable).toBeDefined();
  // });
});
