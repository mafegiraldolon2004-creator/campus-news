
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  nombre = '';
  correo = '';
  asunto = '';
  mensaje = '';

  mensajeExito = '';
  mensajeError = '';

  enviarMensaje(): void {

    this.mensajeExito = '';
    this.mensajeError = '';

    // Verificar que todos los campos estén completos
    if (
      !this.nombre.trim() ||
      !this.correo.trim() ||
      !this.asunto.trim() ||
      !this.mensaje.trim()
    ) {
      this.mensajeError = 'Por favor, completa todos los campos.';
      return;
    }

    // Verificar que el correo tenga un formato válido
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(this.correo.trim())) {
      this.mensajeError = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    // Confirmación de prueba: no se envía a un servidor
    this.mensajeExito = '¡Formulario validado correctamente! Este es un envío de demostración.';

    // Limpiar el formulario
    this.nombre = '';
    this.correo = '';
    this.asunto = '';
    this.mensaje = '';
  }
}
