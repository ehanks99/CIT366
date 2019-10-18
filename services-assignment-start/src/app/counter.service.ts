import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  activeToInactiveCount: number = 0;
  inactiveToActiveCount: number = 0;

  constructor() { }

  incrementActiveToInactiveCount() {
    this.activeToInactiveCount++;

    console.log("Active to Inactive Count: " + this.activeToInactiveCount);
  }

  incrementInactiveToActiveCount() {
    this.inactiveToActiveCount++;

    console.log("Inactive to Active Count: " + this.inactiveToActiveCount);
  }
}
