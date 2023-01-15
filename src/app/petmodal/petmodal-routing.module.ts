import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetmodalPage } from './petmodal.page';

const routes: Routes = [
  {
    path: '',
    component: PetmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetmodalPageRoutingModule {}
