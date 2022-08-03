import { EventBus } from "../lib/event-bus/event-bus";
import { EventBusGroup } from "../lib/event-bus-group/event-bus-group";
import { EventWithPayload, PlainEvent } from "./test-events.types";

describe(`event-bus-group.test`, () => {
  it(`should be constructed`, () => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);
    expect(eGroup).toBeDefined();
  });

  it(`should receive PlainEvent in callback (test event registration)`, (done) => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);

    eGroup.on(PlainEvent, () => {
      done();
    });

    eBus.emit(new PlainEvent());
  });

  it(`should receive DemoPayload in callback (test EventWithPayload)`, (done) => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);
    const demoEvent = new EventWithPayload({ name: "Bob" });

    eGroup.on(EventWithPayload, ({ name }) => {
      expect(name).toEqual(demoEvent.payload.name);
      done();
    });

    eBus.emit(demoEvent);
  });

  it(`should unsubscribe all event callbacks`, () => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);

    eGroup.on(PlainEvent, () => {
      console.log("Received Plain Event");
    });

    eGroup.on(EventWithPayload, (payload) => {
      console.log("Received Event with Payload", payload);
    });

    // this should not throw - test fails if it does throw
    eGroup.unsubscribeAll();
  });

  /**
   * Note: Cannot catch error like this, because the default error callback will not be thrown in the eBus.emit callstack,
   * but in the callstack triggering the callback in eGroup.on().
   *
   * => This can be avoided by the user if he
   * - either passes a global error callback when instantiating new EventBusGroup,
   * - or adding an errorCallback directly inside the eGroup.on() function.
   */
  // it(`should trigger default error callback`, (done) => {
  //   const eBus = new EventBus();
  //   const eGroup = new EventBusGroup(eBus);

  //   eGroup.on(PlainEvent, () => {
  //     throw new Error(`Fake error in callback!`);
  //   });

  //   try {
  //     eBus.emit(new PlainEvent());
  //   } catch (error) {
  //     expect(error).toBeDefined();
  //     done();
  //   }
  // });

  it(`should trigger custom error callback from EventBusGroup constructor`, (done) => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus, (error: unknown) => {
      expect(error).toBeDefined();
      expect(error).toMatchSnapshot();
      done();
    });

    eGroup.on(PlainEvent, () => {
      throw new Error(`Fake error in callback!`);
    });

    eBus.emit(new PlainEvent());
  });

  it(`should trigger custom error callback from eGroup.on()`, (done) => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);

    eGroup.on(PlainEvent, () => {
      throw new Error(`Fake error in callback!`);
    }, {
      errorCallback: (error: unknown) => {
        expect(error).toBeDefined();
        expect(error).toMatchSnapshot();
        done();
      },
    });

    eBus.emit(new PlainEvent());
  });

  it(`should allow overwriting error callback with setDefaultErrorCallback`, (done) => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);

    eGroup.setDefaultErrorCallback((error: unknown) => {
      expect(error).toBeDefined();
      expect(error).toMatchSnapshot();
      done();
    });

    eGroup.on(PlainEvent, () => {
      throw new Error(`Fake error in callback!`);
    });

    eBus.emit(new PlainEvent());
  });

  // TODO: Finish EventBusGroup Tests!
});
