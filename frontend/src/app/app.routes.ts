import { Routes } from '@angular/router';
import { DetalhesComponent } from './produtos/detalhes/detalhes.component';

export const routes: Routes = [
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: 'produtos/detalhes', component: DetalhesComponent },
  { path: 'vendas', loadChildren: () => import('./vendas/vendas.module').then(m => m.VendasModule)},
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', redirectTo: 'inicio' }
];
