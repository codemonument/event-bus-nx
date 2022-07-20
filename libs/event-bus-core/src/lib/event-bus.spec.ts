import { EventBus } from "./event-bus";
import { BusEvent } from "./types/bus-event.type";
import { take } from "rxjs";

class DemoEvent extends BusEvent {
  public type = "DemoEvent";
}

describe("EventBus", () => {
  it("should instantiate EventBus", () => {
    expect(new EventBus()).toBeDefined();
  });

  it("should send and receive (paramless) demo event", (done) => {
    const ebus = new EventBus();
    ebus.on$(DemoEvent).pipe(take(1)).subscribe(() => {
      done();
    });

    ebus.emit(new DemoEvent());
  });
});
