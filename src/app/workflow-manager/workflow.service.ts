import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Step } from './step.model';
import { Workflow } from './workflow.model';
import 'rxjs/add/operator/map'; //find a better place - app.module recommended as per Dan Wahlan
/* Claims institutional 
   Each claim would belong to a versioned workflow.
   The system can have several workflow versions of claims in progress.
   Could be a db table? */

//TODO: How to determine progress if we have to conditionally add/remove component using guard conditions
//on workflow.json, e.g. show up a new Next> component based on condition in previous component.
//TODO: ngrx store would have be a good candidate
@Injectable()
export class WorkflowService {        
    private API_PATH: string = 'http://localhost:3000/api';
    private workflows: Workflow[];

    //TODO: the system need not retrieve all workflows eagerly..
    //may be retrieve the workflow based on workflowtype (dental, professional, ..pa etc) 
    //currently accessed and cache
    constructor(private http: Http) {
        console.log('workflow service constructor.');
        //since its http the subscription is destroyed automatically as soon as the call ends.
         this.http.get(`${this.API_PATH}/workflows`)
                 .map((res: Response) => res.json() as Workflow[])
                .subscribe((wrkflws: Workflow[]) => this.workflows = wrkflws);
    }

    public getWorkflows(): Observable<Workflow[]> {
        return this.http.get(`${this.API_PATH}/workflows`)
                 .map((res: Response) => res.json() as Workflow[]);
    }

    public createWorkflow(workflow: Workflow) {
        return this.http.post(`${this.API_PATH}/workflows`, workflow)
           .map(res => res.json() as Workflow);
    }

    public saveWorkflow(workflow: Workflow) {
        return this.http.put(`${this.API_PATH}/workflows`, workflow)
           .map(res => res.json() as Workflow);
    }

    public deleteWorkflow(id: number, version: number): Observable<any> {
      return this.http.delete(`${this.API_PATH}/workflows/${id}/${version}`)
                      .map(res => res.json());    
    }

    public getLatestWorkflow(workflowId: number): Workflow {
        return this.workflows.find(wrkflw => wrkflw.id == workflowId && wrkflw.active == true);     
    }

    public getSteps(workflowId: number, version: number): Step[] {
        return this.getWorkflow(workflowId, version).steps.sort((step1, step2) => step1.id - step2.id);
    }

    public getNextStep(workflowId: number, version: number, currentStep?: Step): Step {
        if (currentStep == null) {        
            return this.getWorkflow(workflowId, version).steps.find(step => step.start == true);
        } else {
            if(currentStep.nextStep != null) {
               return this.getStep(workflowId, version, currentStep.nextStep);
            } else {
               return currentStep;
            }
        }   
    }

    public getPreviousStep(workflowId: number, version: number, currentStep: Step): Step {
        if(!currentStep.hasOwnProperty("start")) {
            return this.getWorkflow(workflowId, version).steps.find(step => step.nextStep == currentStep.id);
        } else {
            return currentStep;
        }
    }

    private getWorkflow(workflowId: number, version: number): Workflow {
        return this.workflows.find(workflow => workflow.id == workflowId && workflow.version == version)
    }

    private getStep(workflowId: number, version: number, stepId: number): Step {
        return this.getWorkflow(workflowId, version).steps.find(step => step.id == stepId);
    }
}
