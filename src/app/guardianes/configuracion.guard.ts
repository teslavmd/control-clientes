import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfiguracionServicio } from "../servicios/configuracion.service";


@Injectable()
export class ConfiguracionGuard implements CanActivate{
    constructor(
        private router: Router,
        private afAuth : AngularFireAuth,
        private configuracionServicio : ConfiguracionServicio
    ){}

    canActivate(): Observable<boolean>{
        return this.configuracionServicio.getConfiguracion().pipe(
            map(configuracion =>{
                if(configuracion.permitirRegistro){
                    return true;
                }else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        ) as any
    }



}