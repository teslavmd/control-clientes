import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {


  cliente: Cliente = {
    id : '',
    nombre : '',
    apellido : '',
    email : '',
    saldo : 0
  }

  id : string;

  constructor(private clientesService: ClienteServicio, 
              private flashMessage : FlashMessagesService,
              private router : Router,
              private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.clientesService.getCliente(this.id).subscribe(
      cliente => {
        console.log(cliente)
        this.cliente = cliente;
      }
    )
  }

  guardar(clienteForm : NgForm){
    if(!clienteForm.form.valid){
      this.flashMessage.show('Por favor llena el formulario correctamente',{
        cssClass : 'alert-danger', timeout : 4000
      }
    )
    }else{
      clienteForm.form.value.id = this.id;
      console.log(clienteForm.form.value)
      this.clientesService.modificar(clienteForm.form.value);
      this.router.navigate(['/']);
    }

  }

  eliminar(){
    if(confirm('Seguro que desea eliminar el cliente?')){
      this.clientesService.eliminar(this.cliente);
      this.router.navigate(['/'])
    }
  }



}
