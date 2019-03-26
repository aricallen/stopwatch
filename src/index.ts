export enum StopwatchState {
  RUNNING = 'RUNNING',
  IDLE = 'IDLE'
}

export interface StopwatchRecord {
  state: StopwatchState;
  startTime: number | null;
}

export interface IStopwatch {
  start(): void;
  stop(): void;
  reset(): void;
  getDuration(): number | null;
  getState(): StopwatchState;
  getStartTime(): number | null;
  isRunning(): boolean;
  toRecord(): StopwatchRecord;
  // static fromRecord(StopwatchRecord): IStopwatch
}

class Stopwatch implements IStopwatch {
  private state: StopwatchState;
  private startTime: number | null;

  constructor(props = {} as StopwatchRecord) {
    this.state = props.state || StopwatchState.IDLE;
    this.startTime = props.startTime || null;
  }

  start() {
    this.state = StopwatchState.RUNNING;
    this.startTime = Date.now();
  }

  stop() {
    this.state = StopwatchState.IDLE;
  }

  reset() {
    this.startTime = null;
  }

  getDuration() {
    if (this.startTime) {
      return Date.now() - this.startTime;
    }
    return null;
  }

  getState() {
    return this.state;
  }

  getStartTime() {
    return this.startTime;
  }

  isRunning() {
    return this.state === StopwatchState.RUNNING;
  }

  toRecord() {
    return {
      state: this.state,
      startTime: this.startTime,
    };
  }
}

export { Stopwatch };
