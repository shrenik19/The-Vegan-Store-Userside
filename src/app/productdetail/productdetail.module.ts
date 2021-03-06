import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule,MatSelectModule} from '@angular/material';
import { IonicModule } from '@ionic/angular';

import { ProductdetailPage } from './productdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ProductdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductdetailPage]
})
export class ProductdetailPageModule {}
