import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { ClaimService } from '../claim.service';
import { Claim } from '../claim/claim.model';
//import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ep-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.css']
})
export class ClaimsListComponent implements OnInit {
  claims: Claim[];
  //claimSubscription: Subscription;

  constructor(private router: Router,
              private currentRoute: ActivatedRoute,
              private claimService: ClaimService,
               public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadClaims();
  }

  loadClaims() {
    this.claimService.getClaims().subscribe(res => this.claims = res);
  }

  onDentalClick() {         
    let claim = new Claim();
    claim.type = "D";
    this.claimService.createClaim(claim).subscribe( clm => {
      this.router.navigate(['c/dental/', clm.id], { relativeTo: this.currentRoute, skipLocationChange: true });
    });
  }

  onProfessionalClick() {
    let claim = new Claim();
    claim.type = "P";
    this.claimService.createClaim(claim).subscribe( clm => {
      this.router.navigate(['c/professional/', clm.id], { relativeTo: this.currentRoute, skipLocationChange: true });
    });    
  }

  onTrashClick(id) {
    this.claimService.deleteClaim(id).subscribe(
      res => {
        this.openSnackBar('Deleted.');
        this.loadClaims();
      });
  }

  openSnackBar(message) {
    this.snackBar.open(message, null,  {duration: 2000});
  }
}