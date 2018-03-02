import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { Step } from './step.model';
import { Workflow } from './workflow.model';
import { WorkflowType } from './workflow-type.model';
import { WorkflowService } from './workflow.service';
import { DragService } from '../drag.service';
import { DropTargetDirective }  from '../drop-target.directive';
import { DraggableDirective }  from '../draggable.directive';

@Component({
  selector: 'ep-workflow-manager',
  templateUrl: './workflow-manager.component.html',
  styleUrls: ['./workflow-manager.component.css']  
})
export class WorkflowManagerComponent implements OnInit {
  sourceList: string[] = [];
  destinationList: string[] = [];  
  firstStepId: number = 10;
  stepIncrement: number = 10;
  workflowSteps: Step[] = [];
  workflow: Workflow;
  workflows: Workflow[];

  wrkflwTypes: WorkflowType[] = [{'id':1, 'type':'dental'},{'id':2, 'type':'professional'}];
  selectedWorkflowType: WorkflowType;
  classification: string = 'claim';
 
  constructor(private workflowService: WorkflowService,
              public snackBar: MatSnackBar,
              private router: Router) { 
    this.sourceList = ['5010d-claim-info','5010d-provider-info','5010d-ordering-provider-info','5010d-review','5010d-serviceline'];
    this.startNewWorkflow();
  }

  ngOnInit() {
   this.loadWorkflows();
  }

  //TODO: should have been an observable
  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe( workflows =>
    this.workflows = workflows);
  }

  onTrashClick(event, wrkflw) {
    this.workflowService.deleteWorkflow(wrkflw.id, wrkflw.version).subscribe(data =>
        this.loadWorkflows());
    this.openSnackBar('Deleted.');
    event.stopPropagation();
  }

  onActivateClick(event, workflow) {
    workflow.active = workflow.active == true ? false : true;
    console.log(workflow);
    this.workflowService.saveWorkflow(workflow)
                        .subscribe( res => {
                          this.openSnackBar(`Workflow ${workflow.active == false ? 'de-': ''}activated`);
                        }, err => this.openSnackBar('Error saving'));
    event.stopPropagation();
  }

  onWorkflowClick(wrkflw) {
    this.workflow = wrkflw;
    this.destinationList = [];
    wrkflw.steps.forEach(element => {
      this.destinationList.push(element.route);
    });
    this.openSnackBar(`Editing workflow`);
  }

  onClear() {
    this.startNewWorkflow();
    this.openSnackBar(`Ready to create a new workflow.`);
  }

  startNewWorkflow() {
    this.destinationList = [];
    this.workflowSteps = [];
    this.workflow = new Workflow();
    
    this.workflow.active = false;
    this.workflow.version = -1; //to be determined in the backend.
    this.workflow.steps = this.workflowSteps;
  }

  onSave() {
    if(!this.workflow.id) {
      this.openSnackBar(`Select a type.`);
      return;
    }
    //TODO: Save/create could be refactored to service layer
    if(this.workflow.version == -1) {
      this.workflowService.createWorkflow(this.workflow).subscribe( workflow => {
        this.loadWorkflows();
        this.openSnackBar('Workflow saved.');
      });
    } else {
      this.workflowService.saveWorkflow(this.workflow).subscribe( workflow => this.openSnackBar('Workflow saved.'));
    }
  }
  
  //TODO: These could be infact list of steps... - from database, more on this later.
  private updateWorkflow() {
    this.workflowSteps = [];
    let nextStepId: number = this.firstStepId;
    this.destinationList.forEach( (element, index) => {  
      let step = new Step();        
      step.id = nextStepId;
      step.name = element;        
      step.route = element;
      step.nextStep = nextStepId + this.stepIncrement;
      if(index == 0) {          
        step.start = true;          
      } else if(this.destinationList.length - 1 == index) {
        step.nextStep = null;
      }
      nextStepId += 10;
      this.workflowSteps.push(step);
    });
    this.workflow.steps = this.workflowSteps;
  }

  onDrop(data: any) {    
    let item = JSON.parse(data);    
    this.destinationList.push(item.data);
    this.updateWorkflow();
  }

  onDropTrash(data: any) {    
    let item = JSON.parse(data);    
    let index = this.destinationList.findIndex( value => value == item);    
    this.destinationList.splice(index -1, 1);
    this.updateWorkflow();
  }

  openSnackBar(message) {
    this.snackBar.open(message, null,  {duration: 2000});
  }
}