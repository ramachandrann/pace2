import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import {ClaimService} from '../../../claim.service';
import { ClaimInfo } from './claim-info.model';

@Injectable()
export class ClaimInfoResolverService implements Resolve<ClaimInfo> {
  
  constructor(private claimService: ClaimService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClaimInfo> {    
    let id = route.parent.params['id'];
    console.log('claim info route resolver claim id:', id);
    return this.claimService.getClaimInfo(id);   
  }
}