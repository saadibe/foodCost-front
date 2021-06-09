import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormActivatorGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    return new Promise( resolve=>{
      if( this.router.url != "/" ){
        resolve( true )
      }else{
        let t = route.pathFromRoot.map(e=>e.routeConfig?.path).filter(e=> e!=undefined)
        t.pop()
        this.router.navigate([t.join("/")])
        resolve(false)
      }
    })
  }
  
}
