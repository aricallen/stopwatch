const test = require('tape');
const { Stopwatch, StopwatchState } = require('../dist/index.js');

test(`start`, (t) => {
  const sw = new Stopwatch();
  sw.start();
  t.equal(sw.getState(), StopwatchState.RUNNING);
  t.equal(sw.isRunning(), true);
  t.notEqual(sw.getDuration(), null);
  t.end();
});

test(`create`, (t) => {
  const serverTimestamp = new Date('2019-03-03 12:12:42').getTime();
  const sw = new Stopwatch({ startTime: serverTimestamp, state: StopwatchState.RUNNING });
  t.equal(sw.getStartTime(), serverTimestamp);
  t.equal(sw.getState(), StopwatchState.RUNNING);
  t.end();
});

test(`stop`, (t) => {
  const sw = new Stopwatch();
  sw.start();
  sw.stop();
  t.equal(sw.getState(), StopwatchState.IDLE);
  t.equal(sw.isRunning(), false);
  t.notEqual(sw.getDuration(), null);
  t.end();
});

test(`reset`, (t) => {
  const sw = new Stopwatch();
  sw.start();
  sw.reset();
  t.equal(sw.getState(), StopwatchState.RUNNING);
  sw.stop();
  sw.reset();
  t.equal(sw.isRunning(), false);
  t.equal(sw.getDuration(), null);
  t.equal(sw.getStartTime(), null);
  t.end();
});

test(`getDuration()`, (t) => {
  t.plan(3);
  const sw = new Stopwatch();
  sw.start();
  setTimeout(() => {
    t.equal(sw.isRunning(), true);
    t.notEqual(sw.getStartTime(), null);
    t.equal(sw.getDuration() > 50, true);
    t.end();
  }, 100);
});
