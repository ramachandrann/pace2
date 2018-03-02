import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//TODO: workflow manager is a module by itself.
import { WorkflowService } from './workflow-manager/workflow.service';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';
import { DropTargetDirective }  from './drop-target.directive';
import { DraggableDirective }  from './draggable.directive';
import { DragService } from './drag.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkflowManagerComponent,
    DropTargetDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [WorkflowService, DragService],
  bootstrap: [AppComponent]
})
export class AppModule { }
