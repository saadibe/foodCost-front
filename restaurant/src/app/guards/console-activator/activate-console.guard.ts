import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateConsoleGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean>{
    return new Promise<boolean>(async resolve=>{
      let t = localStorage.getItem('valid_admin')
   
      if( !t || t == "false"){
        resolve(false)
        this.router.navigate(['login'])
      }else{
        resolve(true)
      }
    })
  }
  
}
