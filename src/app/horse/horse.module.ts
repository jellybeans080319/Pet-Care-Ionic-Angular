import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorsePageRoutingModule } from './horse-routing.module';

import { HorsePage } from './horse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorsePageRoutingModule
  ],
  declarations: [HorsePage]
})
export class HorsePageModule {}
