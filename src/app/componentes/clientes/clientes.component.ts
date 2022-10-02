import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    id : '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };



  constructor(private clientesService : ClienteServicio,private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal : number = 0;

    if(this.clientes){
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }


  agregar(clienteForm : NgForm){
    if(!clienteForm.form.valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', 
      {
        cssClass: 'alert-danger', 
        timeout: 4000
      })

      
    }else{
      this.clientesService.agregarCliente(clienteForm.form.value)
      clienteForm.reset()
    }
  }

}
