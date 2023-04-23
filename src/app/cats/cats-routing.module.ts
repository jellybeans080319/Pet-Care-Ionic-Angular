import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatsPage } from './cats.page';

const routes: Routes = [
  {
    path: '',
    component: CatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsPageRoutingModule {}
