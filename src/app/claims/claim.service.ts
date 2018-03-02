import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClaimInfo } from './005010x224/dental/claim-info/claim-info.model';
import { Claim } from './claim/claim.model';

@Injectable()
export class ClaimService {
  private API_PATH: string = 'http://localhost:3000/api';

  constructor(private http: Http) { console.log('claimService created.');}

  saveClaimInfo(claimInfo: ClaimInfo): Observable<ClaimInfo> {
    return this.http.put(`${this.API_PATH}/claims`, claimInfo)
           .map(res => res.json() as ClaimInfo);
  }

  getClaimInfo(id: number): Observable<ClaimInfo> {            
    return this.http.get(`${this.API_PATH}/claims/${id}/info`)
                    .map(res => res.json() as ClaimInfo);    
  }

  getClaims(): Observable<Claim[]> {
    return this.http.get(`${this.API_PATH}/claims`)
                    .map(res => res.json() as Claim[]);    
  }

  getClaim(id: number): Observable<Claim> {            
    return this.http.get(`${this.API_PATH}/claims/${id}`)
                    .map(res => res.json() as Claim);    
  }

  deleteClaim(id: number): Observable<any> {
      return this.http.delete(`${this.API_PATH}/claims/${id}`)
                      .map(res => res.json());    
  }

  createClaim(claim: Claim): Observable<Claim> {
    return this.http.post(`${this.API_PATH}/claims`, claim)
           .map(res => res.json() as Claim);
  }
/*  searchProviders(providerName: string): Observable<Provider[]> {
    return this.http.get(`${this.API_PATH}/providers?name=${providerName}`)
           .map(res => res.json());
  }*/

}
