import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './Layout/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutComponent } from './Layout/layout.component';

const appRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'contact', component: ContactComponent,
      },
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      // { path: 'category/:id', component: CategoryComponent },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
