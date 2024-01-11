import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './Layout/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutComponent } from './Layout/layout.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserPageComponent } from './admin/user-page/user-page.component';

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
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'adminhome', component: AdminHomeComponent },
      { path: 'users', component: UserPageComponent },
      { path: '', redirectTo: 'adminhome', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
