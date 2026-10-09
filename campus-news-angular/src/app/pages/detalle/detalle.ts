
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {

  noticia: Noticia | undefined;
  cargando = true;

  constructor(
    private ruta: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDetalle();
  }

  async cargarDetalle(): Promise<void> {
    try {
      // Obtener el identificador de la noticia seleccionada
      const id = Number(this.ruta.snapshot.paramMap.get('id'));

      // Cargar las noticias desde el archivo JSON
      const respuesta = await fetch('/noticias.json');

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las noticias');
      }

      const noticias: Noticia[] = await respuesta.json();

      // Buscar la noticia correspondiente al identificador
      this.noticia = noticias.find(item => item.id === id);
       this.verificarFavorito();
    } catch (error) {
      console.error('Error al cargar el detalle:', error);

    } finally {
      this.cargando = false;
      this.detector.detectChanges();
    }
  }
  
esFavorito = false;

verificarFavorito(): void {
  if (!this.noticia) return;

  const favoritos: number[] = JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );

  this.esFavorito = favoritos.includes(this.noticia.id);
}

alternarFavorito(): void {
  if (!this.noticia) return;

  let favoritos: number[] = JSON.parse(
    localStorage.getItem('favoritos') || '[]'
  );

  if (favoritos.includes(this.noticia.id)) {
    favoritos = favoritos.filter(id => id !== this.noticia!.id);
    this.esFavorito = false;
  } else {
    favoritos.push(this.noticia.id);
    this.esFavorito = true;
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

}
