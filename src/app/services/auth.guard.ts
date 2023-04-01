import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authservice: AuthService,
              private _router: Router) { }

  canActivate(): boolean { 
    route: ActivatedRouteSnapshot
    state: RouterStateSnapshot
    if( this._authservice.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false 
    }
  }            

  
}
