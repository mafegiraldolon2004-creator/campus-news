
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  noticiasDestacadas: Noticia[] = [];

  constructor(private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarNoticiasDestacadas();
  }

  async cargarNoticiasDestacadas(): Promise<void> {
    try {
      const respuesta = await fetch('/noticias.json');

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las noticias');
      }

      const noticias: Noticia[] = await respuesta.json();

      // Seleccionar únicamente las noticias destacadas
      this.noticiasDestacadas = noticias.filter(
        noticia => noticia.destacada === true
      );

      // Actualizar la vista con las noticias cargadas
      this.detector.detectChanges();

    } catch (error) {
      console.error('Error al cargar las noticias destacadas:', error);
    }
  }
}
