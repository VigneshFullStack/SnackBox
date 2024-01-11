import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './Layout/contact/contact.component';

const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      // { path: 'category/:id', component: CategoryComponent },
    ]
  },
  {
    path: 'contact', component: ContactComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
