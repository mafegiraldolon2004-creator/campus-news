
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
  selector: 'app-favoritos',
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {

  noticiasFavoritas: Noticia[] = [];
  cargando = true;

  constructor(private detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  async cargarFavoritos(): Promise<void> {
    try {
      // Obtener los identificadores guardados en el navegador
      const idsFavoritos: number[] = JSON.parse(
        localStorage.getItem('favoritos') || '[]'
      );

      // Obtener todas las noticias
      const respuesta = await fetch('/noticias.json');

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las noticias');
      }

      const noticias: Noticia[] = await respuesta.json();

      // Mostrar únicamente las noticias guardadas
      this.noticiasFavoritas = noticias.filter(noticia =>
        idsFavoritos.includes(noticia.id)
      );

    } catch (error) {
      console.error('Error al cargar favoritos:', error);

    } finally {
      this.cargando = false;
      this.detector.detectChanges();
    }
  }
}
