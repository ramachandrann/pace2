//http://www.radzen.com/blog/angular-drag-and-drop/
import { Input, HostListener, Directive, HostBinding } from '@angular/core';
import { DragService } from './drag.service';

@Directive({
  selector: '[epDraggable]'
})
export class DraggableDirective {
  constructor(private dragService: DragService) {
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @Input()
  set epDraggable(options: DraggableOptions) {
    if (options) {      
      this.options = options;
    }
  }

  private options: DraggableOptions = {};

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {        
    let zone = 'zone'
    let data = {} = this.options;

    if(this.options.zone) {
      zone = this.options.zone;
    }
    this.dragService.startDrag(zone);
    event.dataTransfer.setData('Text', JSON.stringify(data));
  }
}
export interface DraggableOptions {
  zone?: string;
  data?: any;
}