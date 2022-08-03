import { EventBus } from '../lib/event-bus/event-bus';
import { EventualPayload, payloadOf } from '../index';
import { Observable, take } from 'rxjs';
import { expectType } from 'tsd';

import { DemoPayload, EventWithPayload, PlainEvent } from './test-events.types';

describe('EventBus', () => {
  it('should instantiate EventBus', () => {
    expect(new EventBus()).toBeDefined();
  });

  it('should send and receive (paramless) demo event', (done) => {
    const ebus = new EventBus();
    const demoEventInstance = new PlainEvent();

    const listener = ebus.on$(PlainEvent);
    expectType<Observable<void>>(listener);
    expectType<Observable<EventualPayload<payloadOf<PlainEvent>>>>(listener);

    listener.pipe(take(1)).subscribe((event) => {
      // Expect event to be undefined, since this DemoEvent does not have a payload
      // Note, that the return type of on$ is correctly typed to Observable<void> in this case!
      expect(event).toBe(undefined);
      done();
    });

    ebus.emit(demoEventInstance);
  });

  it('should send and receive EventWithPayload', (done) => {
    const ebus = new EventBus();
    const payload: DemoPayload = { name: 'Bob' };
    const demoEventInstance = new EventWithPayload(payload);

    ebus
      .on$(EventWithPayload)
      .pipe(take(1))
      .subscribe((event) => {
        // This checks, whether the type of 'event' variable is correctly coerced by TS
        // Since type information is removed from resulting js,
        // we can only check the contents of event, not the shape agains the intergace DemoPayload
        expect(event.name).toStrictEqual('Bob');
        expect(event).toBe(payload);
        done();
      });

    ebus.emit(demoEventInstance);
  });
});
