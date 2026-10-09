
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  destacada: boolean;
}

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, RouterLink],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css'
})
export class Noticias implements OnInit {

  noticias: Noticia[] = [];

  constructor(private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  async cargarNoticias(): Promise<void> {
    try {
      const respuesta = await fetch('/noticias.json');

      if (!respuesta.ok) {
        throw new Error('No se pudo cargar el archivo JSON');
      }

      this.noticias = await respuesta.json();

      // Actualizar la vista después de cargar las noticias
      this.detector.detectChanges();

    } catch (error) {
      console.error('Error al cargar las noticias:', error);
    }
  }
}
