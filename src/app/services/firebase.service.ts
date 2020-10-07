import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /* in the blank spaces that you will see in the http requests below, were the links to the database,
   so I recommend that you create a database in firebase and in those spaces put the links to where you will 
   make the http requests,
   otherwise the application will not work. or the other option is to create your own database */


  constructor(private http:HttpClient) { }


  enviarDatosFirebase(comida){
    return this.http.post('', comida).pipe(
      map( (res:any) => {comida.id = res.name;                    
                         return comida}    
      )    
      )
  }
  uptadeFood(comida){
    const tempFood = {
      ...comida
    }
  
    delete tempFood.id;
    return this.http.put(``, tempFood)
 }

  obtenerHeroe(id:string){
    return this.http.get(``);
  }

  recibirDatosFire(){
    return this.http.get('').pipe(
      map(resp=> {return this.construirArray(resp)}))
  }



  private construirArray(objeto){
    const comidas:any[] = [];

    Object.keys(objeto).forEach(key=>{

      const comida = objeto[key];
      comida.id = key;
      
      comidas.push(comida);
    });


    return comidas;
}

  eliminar(id){

    return this.http.delete(``)
  }
}