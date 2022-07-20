import { BusEvent } from "./bus-event.type";

describe(`bus-event.type`, () => {
  /**
   * IF PlainEvent extends from BusEvent<void>
   * BusEvent allows the user of PlainEvent
   * to *not* provide a param to the constructor when instantiating it.
   */
  it(`should allow events without payload (=void)`, () => {
    class PlainEvent extends BusEvent<void> {
      public type = "PlainEvent";
    }
    const event = new PlainEvent();
    expect(event).toBeDefined();
  });

  /**
   * IF EventWithPayload extends BusEvent with any other type than void (let's call it T),
   * the user of EventWithpayload is forced to provide a value of type T.
   */
  it(`should allow events with payload (=any)`, () => {
    interface DemoDTO {
      name: string;
    }
    class EventWithPayload extends BusEvent<DemoDTO> {
      public type = "EventWithPayload";
    }

    const payload = { name: "Bob" };
    // Note: If you remove the param, typescript will complain,
    // that you need to provide a value for the payload!
    const event = new EventWithPayload(payload);
    expect(event.payload).toStrictEqual(payload);
  });
});
