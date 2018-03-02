//http://www.radzen.com/blog/angular-drag-and-drop/
import { Output, EventEmitter, Input, HostListener, Directive, HostBinding } from '@angular/core';
import { DragService } from './drag.service';

export interface DropTargetOptions {
  zone?: string;
}

@Directive({
  selector: '[epDropTarget]'
})
export class DropTargetDirective {
  constructor(private dragService: DragService) {
    
  }
  
  @Input()
  set epDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }
  
  @Output('onDrop') drop = new EventEmitter();
  
  private options: DropTargetOptions = {};
  
  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const { zone = 'zone' } = this.options;
    
    if (this.dragService.accepts(zone)) {
       event.preventDefault();
    }
  }
  
  @HostListener('drop', ['$event'])
  onDrop(event) {        
    const data =  JSON.parse(event.dataTransfer.getData('Text'));
    
    this.drop.next(data);
  }
}