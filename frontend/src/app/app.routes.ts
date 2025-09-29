import { Routes } from '@angular/router';
import { UsuarioCadastroComponent } from './pages/usuario-cadastro/usuario-cadastro.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cadastro' },
  { path: 'cadastro', component: UsuarioCadastroComponent },
];
