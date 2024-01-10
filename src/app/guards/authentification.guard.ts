import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class authentificationGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthentificated: boolean = this.authService.isAuthentificated();
    let connecter=this.authService.estConnecter();
    if(!connecter){
      return false
    }
    return true
    // console.log(isAuthentificated);

    // if (!isAuthentificated) {
    //   this.router.navigateByUrl("");
    // }
    // return isAuthentificated;
  }
};


