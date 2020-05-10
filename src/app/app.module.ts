import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from '@angular/material/card';
import {AppComponent} from './components/app/app.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductService} from "./services/product/product.service";
import {ProductComponent} from './components/product/product.component';
import {LoginComponent} from './components/login/login.component';
import {UserService} from "./services/user/user.service";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {HomeComponent} from './components/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSidenavModule
  ],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
