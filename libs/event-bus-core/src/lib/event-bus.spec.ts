import { EventBus } from "./event-bus";
import { BusEvent } from "./types/bus-event.type";
import { BusEventWithPayload } from "./types/bus-event-with-payload.type";
import { take } from "rxjs";

class DemoEvent extends BusEvent {
  public type = "DemoEvent";
}

interface DemoPayload {
  name: string;
}

class DemoWithPayload extends BusEventWithPayload<DemoPayload> {
  public type = "DemoEvent";
}

describe("EventBus", () => {
  it("should instantiate EventBus", () => {
    expect(new EventBus()).toBeDefined();
  });

  it("should send and receive (paramless) demo event", (done) => {
    const ebus = new EventBus();
    const demoEventInstance = new DemoEvent();
    ebus.on$(DemoEvent).pipe(take(1)).subscribe((event) => {
      // Checks object equality
      expect(event).toBe(demoEventInstance);
      done();
    });

    ebus.emit(demoEventInstance);
  });

  it("should send and receive DemoWithPayload events", (done) => {
    const ebus = new EventBus();
    const demoEventInstance = new DemoWithPayload({ name: "Bob" });
    ebus.on$(DemoWithPayload).pipe(take(1)).subscribe((event) => {
      expect(event.payload.name).toStrictEqual("Bob");
      expect(event).toBe(demoEventInstance);
      done();
    });

    ebus.emit(demoEventInstance);
  });
});
