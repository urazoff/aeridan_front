import {Injectable} from '@angular/core';
import {AuthorizationService} from '../_requests/authorization.service';
import {NavigatorService} from './navigator.service';
import {IUser} from '../_interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccessSecurityService {

  constructor(private auth: AuthorizationService, private nav: NavigatorService) {
  }

  isOwner(ownerId: string) {
    return this.auth.getUser().then((response: IUser) => {
      return response !== null && response.id === ownerId;
    });
  }

  canEdit(ownerId: string) {
    this.isOwner(ownerId).then((result: boolean) => {
      if (!result) {
        this.nav.to('/');
      }
    });
  }

}
