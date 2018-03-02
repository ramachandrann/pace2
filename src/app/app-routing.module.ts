import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkflowManagerComponent } from './workflow-manager/workflow-manager.component';

//TODO: Claim's should be a feature or module by itself.
const routes: Routes = [
  { path: '', redirectTo: '/claims', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'claims', loadChildren: 'app/claims/claims.module#ClaimsModule' },
  { path: 'workflowman', component: WorkflowManagerComponent },
  //{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
//{ path: '', redirectTo: 'claim-info', pathMatch: 'full' },