import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './Layout/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutComponent } from './Layout/layout.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './admin/user-page/user-page.component';
import { CategoryComponent } from './admin/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AdminComponent,
    LayoutComponent,
    AdminHomeComponent,
    LoginComponent,
    UserPageComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
