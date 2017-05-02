import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //if user is logged in allow access to protected routes
        if(localStorage.getItem('user')) {
            return true;
        }
        //if user is not logged in, redirect to login page
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}