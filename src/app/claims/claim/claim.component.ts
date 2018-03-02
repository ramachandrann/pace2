import { Component, OnInit, OnDestroy, Output, EventEmitter, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {WorkflowService} from '../../workflow-manager/workflow.service';
import {Step} from '../../workflow-manager/step.model';
import {ClaimService} from '../claim.service';
import { Claim } from './claim.model';

//TODO: do up types for flowchart 
declare var flowchart: any;

@Component({
  selector: 'ep-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit, OnDestroy {
  claimId: number;
  claimType: string;
  private routeParamSubscription: any;
  currentWorkflowStep: Step;
  workflowSteps: Step[];
  private workflowId: number;
  private version: number;
  claim: Claim;
  showModal: boolean;
  nextButtonLabel: string;
  showStepProgress: boolean;
    
  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private workflowService: WorkflowService,
              private claimService: ClaimService,
              private ngZone: NgZone) { 
                this.showModal = false; 
                this.showStepProgress = false;
                console.log('claims constructor.'); 
              }

  ngOnInit() {
    console.log('claims on init.');    
    this.nextButtonLabel = "Next";
    this.routeParamSubscription = this.currentRoute.params.subscribe(params => {
      this.claimType = params['type']; // (+) converts string 'id' to a number
      this.claimId = params['id']; 
      
      if(this.claimId == -1) { //NEW CLAIM
        let workflowId = 0;
        //TODO: Refine logic to determine workflowId based on WORKFLOWTYPE
        if(this.claimType == 'professional') {
          workflowId = 2;
        } 
        if(this.claimType == 'dental') {
          workflowId = 1;
        } 
        //load up the latest version of claim  workflow based on type of claim
        let workflow = this.workflowService.getLatestWorkflow(workflowId);
        this.workflowId = workflow.id;
        this.version = workflow.version;       
        this.workflowSteps = this.workflowService.getSteps(this.workflowId, this.version);
        this.currentWorkflowStep = this.workflowService.getNextStep(this.workflowId, this.version);
        this.router.navigate([this.currentWorkflowStep.route], { relativeTo: this.currentRoute, skipLocationChange: true });
      } else {
        //load up the existing claim along with its ui workflow id + version        
        this.claimService.getClaim(this.claimId).subscribe(res => {console.log(res); 
          this.claim = res
          this.workflowId = this.claim.workflow_id;
          this.version = this.claim.workflow_version;       
          this.workflowSteps = this.workflowService.getSteps(this.workflowId, this.version);
          this.currentWorkflowStep = this.workflowService.getNextStep(this.workflowId, this.version);
          this.router.navigate([this.currentWorkflowStep.route], { relativeTo: this.currentRoute});          
        });
      }
    });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

  onNext(): void {    
    let nextStep = this.workflowService.getNextStep(this.workflowId, this.version, this.currentWorkflowStep);
    this.router.navigate([nextStep.route], { relativeTo: this.currentRoute, skipLocationChange: true })
    .then( value => { 
                       console.log(value); 
                       if (value == true) {
                         this.currentWorkflowStep =  nextStep; 
                         this.nextButtonLabel = this.currentWorkflowStep.nextStep == null ? "Submit" : "Next";
                       }
                     },
           reason => {console.log(reason)});
  }

  onPrev(): void {
    let prevStep = this.workflowService.getPreviousStep(this.workflowId, this.version, this.currentWorkflowStep);
    this.router.navigate([prevStep.route], { relativeTo: this.currentRoute, skipLocationChange: true })
    .then( value => { 
                       console.log(value); 
                       if (value == true) {
                         this.currentWorkflowStep =  prevStep; 
                         this.nextButtonLabel = this.currentWorkflowStep.nextStep == null ? "Submit" : "Next";
                       }
                     },
           reason => {console.log(reason)});
  }

  modalClick() {
    this.drawState();
    this.showModal = true;
  }

  modalCloseClick() {
    this.showModal = false;
  }

  showSteps() {
    this.showStepProgress = this.showStepProgress ? false: true;
  }

  drawState(): void {    
     this.ngZone.runOutsideAngular(() => {
        /*var diagram = flowchart.parse('st=>start: Start\n' +  
                                      'submitted=>operation: Submitted\n' +
                                      'approved=>operation: Approved\n' +
                                      'rejected=>operation: Rejected\n' +
                                      'cond=>condition: DOH Approval|current\n' +                                       
                                      'e=>end: End\n' +
                                      'st->submitted->cond\n' +
                                      'cond(yes)->approved->e\n'+ 
                                      'cond(no)->rejected->e');
        */        
        let stateMachine =            'draft=>operation: Draft|draftIndicator\n' +
                                      'submitted=>operation: Submitted|submittedIndicator\n' +
                                      'approved=>operation: Approved|approvedIndicator\n' +
                                      'rejected=>operation: Rejected|rejectedIndicator\n' +
                                      'cond=>condition: DOH Approval|dohActionIndicator\n' +
                                      'draft->submitted\n' +
                                      'submitted->cond\n' +
                                      'cond(yes)->approved\n'+ 
                                      'cond(no)->rejected';
        switch(this.claim.status_code) {
          case 'D': 
              stateMachine = stateMachine.replace('|draftIndicator','|current');
              stateMachine = stateMachine.replace('|submittedIndicator','');
              stateMachine = stateMachine.replace('|approvedIndicator','');
              stateMachine = stateMachine.replace('|rejectedIndicator','');
              stateMachine = stateMachine.replace('|dohActionIndicator','');
          case 'S': 
              stateMachine = stateMachine.replace('|draftIndicator','');
              stateMachine = stateMachine.replace('|submittedIndicator','|current');
              stateMachine = stateMachine.replace('|approvedIndicator','');
              stateMachine = stateMachine.replace('|rejectedIndicator','');
              stateMachine = stateMachine.replace('|dohActionIndicator','');
          case 'A':
              stateMachine = stateMachine.replace('|draftIndicator','');
              stateMachine = stateMachine.replace('|submittedIndicator','');
              stateMachine = stateMachine.replace('|approvedIndicator','|current');
              stateMachine = stateMachine.replace('|rejectedIndicator','');
              stateMachine = stateMachine.replace('|dohActionIndicator','');
          case 'R':
              stateMachine = stateMachine.replace('|draftIndicator','');
              stateMachine = stateMachine.replace('|submittedIndicator','');
              stateMachine = stateMachine.replace('|approvedIndicator','');
              stateMachine = stateMachine.replace('|rejectedIndicator','|current');
              stateMachine = stateMachine.replace('|dohActionIndicator','');
          case 'O':
              stateMachine = stateMachine.replace('|draftIndicator','');
              stateMachine = stateMachine.replace('|submittedIndicator','');
              stateMachine = stateMachine.replace('|approvedIndicator','');
              stateMachine = stateMachine.replace('|rejectedIndicator','');
              stateMachine = stateMachine.replace('|dohActionIndicator','|current');
          default:
              stateMachine = stateMachine.replace('|draftIndicator','');
              stateMachine = stateMachine.replace('|submittedIndicator','');
              stateMachine = stateMachine.replace('|approvedIndicator','');
              stateMachine = stateMachine.replace('|rejectedIndicator','');
              stateMachine = stateMachine.replace('|dohActionIndicator','');
        }   
        console.log(stateMachine);
        let diagram = flowchart.parse(stateMachine);
        //diagram.drawSVG('diagram'); 
        // you can also try to pass options: 
        diagram.drawSVG('diagram', {
                                'x': 0,
                                'y': 0,
                                'line-width': 2,
                                'line-length': 50,
                                'text-margin': 10,
                                'font-size': 12,
                                'font-color': 'black',
                                'line-color': 'gray',
                                'element-color': 'black',
                                'fill': 'white',
                                'yes-text': 'yes',
                                'no-text': 'no',
                                'arrow-end': 'block',
                                'scale': 1,
                                // style symbol types 
                                'symbols': {
                                    'start': {
                                      'line-width': 1,
                                      'font-color': 'black',
                                      'element-color': 'black',
                                      'fill': 'white'
                                    },
                                    'end':{
                                        'line-width': 1,
                                        'class': 'end-element'
                                    },
                                    'operation': {                                      
                                      'line-width': 1,
                                      'opacity':0.1, 
                                      'rx':20, 
                                      'ry':20
                                    },
                                    'condition': {
                                      'line-width': 1
                                    }
                                },
                                // even flowstate support ;-) 
                                'flowstate' : {
                                     'past' : { 'fill' : '#CCCCCC', 'font-size' : 12}, 
                                     'current' : {'fill' : 'gray', 'font-color' : 'white', 'font-weight' : 'bold'}, 
                                     'future' : { 'fill' : '#FFFF99'}, 
                                    'request' : { 'fill' : 'blue'}//, 
                                    // 'invalid': {'fill' : '#444444'}, 
                                    // 'approved' : { 'fill' : '#58C4A3', 'font-size' : 12, 'yes-text' : 'APPROVED', 'no-text' : 'n/a' }, 
                                    // 'rejected' : { 'fill' : '#C45879', 'font-size' : 12, 'yes-text' : 'n/a', 'no-text' : 'REJECTED' } 
                                  }
                              });     
        
        // reenter the Angular zone and display done
        this.ngZone.run(() => {console.log('Outside Done!') });
   });
  }
}