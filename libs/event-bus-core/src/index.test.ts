import { EventBus } from "./index";

describe(`index.test - tests the public interface of @codemonument/event-bus-core`, () => {
  it("should instantiate EventBus", () => {
    expect(new EventBus()).toBeDefined();
  });
});
