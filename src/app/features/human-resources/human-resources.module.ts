import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './human-resources.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    HumanResourcesComponent
  ],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    SharedModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class HumanResourcesModule { }
