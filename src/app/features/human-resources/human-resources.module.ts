import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './human-resources.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class HumanResourcesModule {}
