import { EventBus } from "../event-bus/event-bus";
import { EventBusGroup } from "./event-bus-group";

describe(`event-bus-group.test`, () => {
  it(`should be constructed`, () => {
    const eBus = new EventBus();
    const eGroup = new EventBusGroup(eBus);

    expect(eGroup).toBeDefined();
  });
});
