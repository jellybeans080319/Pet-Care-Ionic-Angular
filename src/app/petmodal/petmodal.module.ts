import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetmodalPageRoutingModule } from './petmodal-routing.module';

import { PetmodalPage } from './petmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetmodalPageRoutingModule
  ],
  declarations: [PetmodalPage]
})
export class PetmodalPageModule {}
