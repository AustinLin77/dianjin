import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadMePage } from './read-me';

@NgModule({
  declarations: [
    ReadMePage,
  ],
  imports: [
    IonicPageModule.forChild(ReadMePage),
  ],
})
export class ReadMePageModule {}
