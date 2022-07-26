import { BusEvent, EventualPayload, NewableBusEvent } from "./bus-event.type";
import { expectAssignable, expectNotAssignable, expectType } from "tsd";

/**
 * For testing events without payload
 */
class PlainEvent extends BusEvent<void> {
  public type = "PlainEvent";
}

/**
 * For testing events with payload
 */
interface DemoPayloadType {
  name: string;
}
class EventWithPayload extends BusEvent<DemoPayloadType> {
  public type = "EventWithPayload";
}

describe(`EventualPayload`, () => {
  it(`should not accept assigning undefined to EventualPayload<DemoPayloadType>`, () => {
    expectNotAssignable<EventualPayload<DemoPayloadType>>(undefined);
  });
  it(`should accept assigning undefined to EventualPayload<void>`, () => {
    expectAssignable<EventualPayload<void>>(undefined);
  });
});

describe(`bus-event.type`, () => {
  /**
   * IF PlainEvent extends from BusEvent<void>
   * BusEvent allows the user of PlainEvent
   * to *not* provide a param to the constructor when instantiating it.
   */
  it(`should allow event construction without payload (=void)`, () => {
    const event = new PlainEvent();
    expect(event).toBeDefined();

    // Type Expectations
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
  it(`should allow event construction with payload (=any)`, () => {
    const payload: DemoPayloadType = { name: "Bob" };
    // Note: If you remove the param, typescript will complain,
    // that you need to provide a value for the payload!
    const event = new EventWithPayload(payload);
    expect(event.payload).toStrictEqual(payload);

    // Type Expectations
    expectType<DemoPayloadType>(event.payload);
  });

  it(`PlainEvent should be compareable with instanceof`, () => {
    const event = new PlainEvent();
    expect(event instanceof PlainEvent).toBeTruthy();
  });

  it(`EventWithPayload should be compareable with instanceof`, () => {
    const payload: DemoPayloadType = { name: "Bob" };
    const event = new EventWithPayload(payload);
    expect(event instanceof EventWithPayload).toBeTruthy();
  });

  //
  /**
   * Maybe the NewableXXX Stuff is not testable in this manner (since plain instanceof works directly)
   * Maybe test this Newable behavior in event-bus.spec
   *
   * bjesuiter 2022-07-25: I deem the NewableXXX stuff not testable here.
   * Since NewableBusEvent interface does only testify, that a certain type can be constructed using a specific constructor,
   * it has no value representation and therefore can't be used in expectType<> generic param.
   *
   * I also failed trying to indirectly test the correctness of the NewableBusEvent Interface by using it
   * as a param to a mocked `createEvent` Function, bc. in the end, the type of payload inside PlainEvent and payload inside BusEvent
   * do not match. This may be solvable, but the construct seems too complicated.
   *
   * In the end, the event bus should work and should be able to filter events on the eventStream
   * based on the ClassObject passed to the eventBus.on$ filter function.
   * If this works in the test of event-bus.ts, I deem that it satisfies the validity of this NewableBusEvent Interface,
   * bc. the NewableBusEvent Interface has only the goal of allowing the `instanceof` check in <EventBus>.on$().
   */
  // it(`PlainEvent should be assignable to NewableBusEvent`, () => {
  //   const event = new PlainEvent();
  //   // const newable: SimpleNewable<PlainEvent> = event;

  //   const createEvent = <E extends BusEvent<P>, P>(
  //     factory: NewableBusEvent<E, P>,
  //   ): E => {
  //     return new factory(undefined);
  //   };

  //   // Type Expectations
  //   expectType<PlainEvent>(
  //     createEvent<PlainEvent, EventualPayload<void>>(PlainEvent),
  //   );
  // });

  // it.skip(`EventWithPayload should be assignable to NewableBusEvent`, () => {
  //   const payload: DemoPayload = { name: "Bob" };
  //   const event = new EventWithPayload(payload);

  //   const newable: NewableBusEvent<EventWithPayload, DemoPayload> = event;
  //   // const newable: SimpleNewable<EventWithPayload> = event;

  //   expect(newable).toBeDefined();
  // });
});
