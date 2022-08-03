import { EventBus } from "../lib/event-bus/event-bus";
import { EventBusGroup } from "../lib/event-bus-group/event-bus-group";

describe(`event-bus-group.test`, () => {
  it(`should be constructed`, () => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);
    expect(eGroup).toBeDefined();
  });

  // TODO: Finish EventBusGroup Tests!
});
