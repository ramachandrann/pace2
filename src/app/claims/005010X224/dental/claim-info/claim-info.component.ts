import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CanComponentDeactivate } from '../../../can-deactivate-guard.service';
import { ClaimInfo } from './claim-info.model';
import {ClaimService} from '../../../claim.service';

@Component({
  selector: 'ep-claim-info',
  templateUrl: './claim-info.component.html',
  styleUrls: ['./claim-info.component.css']
})
export class ClaimInfoComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  claimInfoFormGrp: FormGroup;
  claimInfo: ClaimInfo;
  claimId: number;
  
  constructor(private currentRoute: ActivatedRoute,
              private fb: FormBuilder,
              private claimService: ClaimService) { this.claimInfo = new ClaimInfo();}

  ngOnInit() {
    this.currentRoute.data
      .subscribe( data => {
        this.claimInfo = data[0];        
        this.claimId = this.claimInfo.claim_id;
          this.buildForm();          
      });
  }

  ngOnDestroy() {}

  buildForm(): void {
    console.log('build form:',this.claimInfo);
    this.claimInfoFormGrp = this.fb.group({
      'info_data1': [this.claimInfo.info_data1, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
        ]
      ],
      'info_data2': [this.claimInfo.info_data2],
      'info_data3': [this.claimInfo.info_data3, Validators.required]
    });

    this.claimInfoFormGrp.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.claimInfoFormGrp) { return; }
    
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = this.claimInfoFormGrp.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        console.log(control.errors)
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }    
    if(data) {
      this.claimInfo = data;    
    }
  }

  formErrors = {
    'info_data1': '',
    'info_data2': '',
    'info_data3': ''
  };

  validationMessages = {
    'info_data1': {
      'required':      'info_data1 is required.',
      'minlength':     'info_data1 must be at least 4 characters long.',
      'maxlength':     'info_data1 cannot be more than 24 characters long.'
    },
    'info_data3': {
      'required': 'info_data3 is required.'
    }
  };

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {    
    //validate and or save data in a piece-meal manner...probably call claimservice?
    console.log('Claim Info - Can Deactivate?')    
    console.log(this.claimInfo);
    this.claimInfo.claim_id = this.claimId;
    if(!this.hasErrors()) {
      this.claimService.saveClaimInfo(this.claimInfo).subscribe( res => {
           //TODO: need to handle errors and return flag appropriately.
      });
      return true;
    } else {
      return false;
    }
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    /*if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }*/
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    //return this.dialogService.confirm('Discard changes?');
  }

  hasErrors() {
    //perform basic validations?
    for (const field in this.formErrors) {      
      if(this.formErrors[field] != '') {
        return true;
      }
    }    
    //TODO:return server side validations or rule engine based validations (conditional fields/sections)

    return false;
  }
}
