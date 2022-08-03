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

  // TODO: Finish EventBusGroup Tests!
});
