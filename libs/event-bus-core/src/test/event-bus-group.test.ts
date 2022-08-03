import { EventBus } from "../lib/event-bus/event-bus";
import { EventBusGroup } from "../lib/event-bus-group/event-bus-group";
import { PlainEvent } from "./test-events.types";

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

  // TODO: Finish EventBusGroup Tests!
});
