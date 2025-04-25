import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: '', pathMatch: 'full', redirectTo: 'produtos' },
  { path: '**', redirectTo: 'produtos' }
];
