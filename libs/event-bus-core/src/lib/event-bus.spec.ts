import { EventBus } from "./event-bus";
import { BusEvent } from "./types/bus-event.type";
import { take } from "rxjs";

/**
 * For testing events without payload
 */
class PlainEvent extends BusEvent<void> {
  public type = "PlainEvent";
}

/**
 * For testing events with payload
 */
interface DemoPayload {
  name: string;
}
class EventWithPayload extends BusEvent<DemoPayload> {
  public type = "EventWithPayload";
}

describe("EventBus", () => {
  it("should instantiate EventBus", () => {
    expect(new EventBus()).toBeDefined();
  });

  it("should send and receive (paramless) demo event", (done) => {
    const ebus = new EventBus();
    const demoEventInstance = new PlainEvent();
    ebus.on$(PlainEvent).pipe(take(1)).subscribe((event) => {
      // Expect event to be undefined, since this DemoEvent does not have a payload
      // Note, that the return type of on$ is correctly typed to Observable<void> in this case!
      expect(event).toBe(undefined);
      done();
    });

    ebus.emit(demoEventInstance);
  });

  it.skip("should send and receive DemoWithPayload events", (done) => {
    const ebus = new EventBus();
    const demoEventInstance = new DemoWithPayload({ name: "Bob" });

    ebus.on$(DemoWithPayload).pipe(take(1)).subscribe((event) => {
      expect(event.name).toStrictEqual("Bob");
      expect(event).toBe(demoEventInstance);
      done();
    });

    ebus.emit(demoEventInstance);
  });
});
