import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../modelos/configuracion.model'
     

@Injectable()
export class ConfiguracionServicio{
    configuracionDoc : AngularFirestoreDocument<Configuracion | any>
    configuracion : Observable<Configuracion>

    id : string = '1';


    constructor(private db : AngularFirestore){}
    
    getConfiguracion() :Observable<Configuracion>{
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion(configuracion : Configuracion){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion)
    }


}