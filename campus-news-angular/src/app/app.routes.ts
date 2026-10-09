
import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Noticias } from './pages/noticias/noticias';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'noticias',
    component: Noticias
  },
  {
    path: 'detalle/:id',
    component: Detalle
  },
  {
    path: 'favoritos',
    component: Favoritos
  },
  {
    path: 'contacto',
    component: Contacto
  }
];
