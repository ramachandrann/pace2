import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsListComponent } from './claims-list/claims-list.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimInfoComponent } from './005010x224/dental/claim-info/claim-info.component';
import { ProviderInfoComponent } from './005010x224/dental/provider-info/provider-info.component';
import { OrderingProviderInfoComponent } from './005010x224/dental/ordering-provider-info/ordering-provider-info.component';
import { ReviewComponent } from './005010x224/dental/review/review.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { ClaimInfoResolverService } from './005010x224/dental/claim-info/claim-info-resolver.service'
import {ClaimService} from './claim.service';
import {ClaimStatusPipe} from './claim-status.pipe';
import { ServiceLinesComponent } from './005010x224/dental/service-lines/service-lines.component';
import { ReferringProvider5010d2310aComponent } from './005010X224/dental/referring-provider-5010d-2310a/referring-provider-5010d-2310a.component';

@NgModule({
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClaimsListComponent,
                 ClaimComponent,
                 ClaimInfoComponent,
                 ProviderInfoComponent,
                 OrderingProviderInfoComponent,
                 ReviewComponent,
                 ClaimStatusPipe,
                 ServiceLinesComponent,
                 ReferringProvider5010d2310aComponent],
  providers:[CanDeactivateGuardService, ClaimInfoResolverService, ClaimService]
})
export class ClaimsModule { }
