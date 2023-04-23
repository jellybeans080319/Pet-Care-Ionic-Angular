import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirdPage } from './bird.page';

const routes: Routes = [
  {
    path: '',
    component: BirdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirdPageRoutingModule {}
