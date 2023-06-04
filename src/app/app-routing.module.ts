import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'products',
    component: ListComponent
  }, {
    path: 'products/:id',
    component: DetailComponent
  },
  { path: '**', redirectTo: '/products' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
