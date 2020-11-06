import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {
  running = false;
  currentCount = 0;
  warnAt = 0;
  tickerInterval: any;
  warn: EventEmitter<number> = new EventEmitter<number>();
  expired: EventEmitter<boolean> = new EventEmitter<boolean>();
  initialCountValue = 0;

  private isDebugMode = false;
  private debugTickIntervalInSeconds = 10;

  constructor() {}

  start(countdownFrom: number = 10, warnAt: number = 5) {
      this.running = true;
      this.currentCount = countdownFrom;
      this.initialCountValue = countdownFrom;
      this.warnAt = warnAt;
      this.tickerInterval = setInterval(this.tick.bind(this), 1000);
  }

  clear() {
    clearInterval(this.tickerInterval);
    this.running = false;
    this.currentCount = this.initialCountValue;
  }

  restart() {
    this.currentCount = this.initialCountValue;
  }

  tick() {
    if (this.currentCount <= this.warnAt) {
      this.warn.emit(this.currentCount);
    }

    if (this.currentCount === 0) {
      this.expired.emit(true);
      this.running = false;
      clearInterval(this.tickerInterval);
    }
    this.currentCount--;

    if (this.isDebugMode) {
      this.debugMessage(this.currentCount, this.warnAt);
    }
  }

  private debugMessage(currentCount: number, warnAt: number) {
    let debugMessage: string;
    if (currentCount <= 0) {
      debugMessage = 'Time\'s up!';
    } else if (currentCount % this.debugTickIntervalInSeconds === 0) {
      debugMessage = currentCount + ' seconds left!';
      if (currentCount > warnAt) {
        debugMessage = debugMessage + ' Warning @ ' + warnAt + ' seconds!';
      }
    }
    if (debugMessage) {
      console.log(debugMessage);
    }
  }
}
