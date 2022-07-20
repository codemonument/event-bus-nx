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

  it("should send and receive EventWithPayload", (done) => {
    const ebus = new EventBus();
    const payload: DemoPayload = { name: "Bob" };
    const demoEventInstance = new EventWithPayload(payload);

    ebus.on$(EventWithPayload).pipe(take(1)).subscribe((event) => {
      // This checks, whether the type of 'event' variable is correctly coerced by TS
      // Since type information is removed from resulting js,
      // we can only check the contents of event, not the shape agains the intergace DemoPayload
      expect(event.name).toStrictEqual("Bob");
      expect(event).toBe(payload);
      done();
    });

    ebus.emit(demoEventInstance);
  });
});
