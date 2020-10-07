import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  formulario:FormGroup;
  calorias:number;

  

  constructor(private fb:FormBuilder, private service:FirebaseService, private route:ActivatedRoute) { 
    this.createForm();
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');


    if ( id !== 'id' ) {

      this.service.obtenerHeroe( id )
        .subscribe( (resp:any) => {
   

          this.formulario.patchValue(resp);
          this.formulario.patchValue({id:id})

        });

    }
  }

  createForm(){
    this.formulario = this.fb.group({
      id: [''],
      nombre: ['',Validators.required],
      proteina:['',Validators.required],
      carbohidratos:['',Validators.required],
      grasas:['',Validators.required],
      calorias: [0]      
    })
  }





  ngSumited(){

  if(this.formulario.invalid){
    console.error('The form is invalid');
    return;
  }


  Swal.fire({
    title:'wait',
    text:'saving information',
    icon: 'info',
    allowOutsideClick:false
  });

  Swal.showLoading();

  let peticion:Observable<any>;

   this.formulario.value.calorias = this.formulario.value.proteina * 4 + this.formulario.value.grasas * 8 + this.formulario.value.carbohidratos * 4;
 
   if(!this.formulario.value.id){
      peticion = this.service.enviarDatosFirebase(this.formulario.value);

  
   }else{
      peticion = this.service.uptadeFood(this.formulario.value);
   }


   peticion.subscribe(resp=>{
     Swal.fire({
       title:this.formulario.value.nombre,
       text: 'was updated correctly',
       icon: 'success',
     })
   })
  }
}
