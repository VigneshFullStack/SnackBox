import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './product/category/category.component';
const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'category/:id', component: CategoryComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
