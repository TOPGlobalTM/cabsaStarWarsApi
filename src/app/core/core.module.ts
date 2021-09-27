import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwapiService } from './services/swapi/swapi.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SwapiService
  ]
})
export class CoreModule {}
