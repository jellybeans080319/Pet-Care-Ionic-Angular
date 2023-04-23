import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirdPageRoutingModule } from './bird-routing.module';

import { BirdPage } from './bird.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirdPageRoutingModule
  ],
  declarations: [BirdPage]
})
export class BirdPageModule {}
