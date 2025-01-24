import { Injectable } from '@angular/core';
import Locals from 'ngx-editor/lib/Locals';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private _debugMode : boolean = false;

  constructor() {
    const storedValue = localStorage.getItem('DPX_debugMode');

    if (storedValue) {
      if (storedValue === '1' || storedValue === 'true' || storedValue === 'True') {
        this._debugMode = true;
      }
    }

  }

  get debugMode(): boolean {
    return this._debugMode;
  }

}

