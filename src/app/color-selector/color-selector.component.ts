import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectorComponent {
  @Input() count: number = 0;

  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  increment(){
    this.count ++;
    this.countChange.emit(this.count);
  }

  decrement(){
    this.count --;
    this.countChange.emit(this.count);
  }
}
