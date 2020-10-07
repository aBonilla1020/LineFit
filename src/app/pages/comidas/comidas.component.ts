import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit {

  comidas:any[] = [];


  constructor(private service:FirebaseService) { 

  }

  ngOnInit(): void {   
    this.ponerDatos()
  }

  ponerDatos(){
    this.service.recibirDatosFire().subscribe((resp:any)=>{this.comidas = resp})
  }
  borrar(id, i:number){
    this.comidas.splice(i,1);
    this.service.eliminar(id).subscribe();
  }
 
}
