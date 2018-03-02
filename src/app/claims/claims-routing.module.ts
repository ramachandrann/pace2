import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsListComponent } from './claims-list/claims-list.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimInfoComponent } from './005010x224/dental/claim-info/claim-info.component';
import { ProviderInfoComponent } from './005010x224/dental/provider-info/provider-info.component';
import { OrderingProviderInfoComponent } from './005010x224/dental/ordering-provider-info/ordering-provider-info.component';
import { ReviewComponent } from './005010x224/dental/review/review.component';
import { ClaimInfoResolverService } from './005010x224/dental/claim-info/claim-info-resolver.service'
import { ServiceLinesComponent } from './005010x224/dental/service-lines/service-lines.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ClaimsListComponent },
    { path: 'c/:type/:id', component: ClaimComponent,
      children: [
        { path: '5010d-claim-info', component: ClaimInfoComponent, canDeactivate: [CanDeactivateGuardService], resolve: [ClaimInfoResolverService] },
        { path: '5010d-provider-info', component: ProviderInfoComponent, canDeactivate: [CanDeactivateGuardService] },
        { path: '5010d-ordering-provider-info', component: OrderingProviderInfoComponent,  canDeactivate: [CanDeactivateGuardService] },
        { path: '5010d-review', component: ReviewComponent,  canDeactivate: [CanDeactivateGuardService] },
        { path: '5010d-serviceline', component: ServiceLinesComponent,  canDeactivate: [CanDeactivateGuardService] }
      ]
     }
  ])],
  exports: [RouterModule]
})
export class ClaimsRoutingModule {}