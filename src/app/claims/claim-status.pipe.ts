import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'claimStatus' })
export class ClaimStatusPipe implements PipeTransform {
  transform(claimStatusCode: string): string {
    switch(claimStatusCode) {
        case 'D': 
            return 'Draft'; 
        case 'S':
            return 'Submitted';
        case 'A':
            return 'Approved';
        case 'R':
            return 'Rejected';
        case 'O':
            return 'Awaiting DOH Action';
        default:
            return 'Undefined'
    }
  }
}