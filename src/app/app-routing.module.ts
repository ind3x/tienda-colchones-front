import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {ProductComponent} from "./components/product/product.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mattresses', component: ProductsComponent},
  {path: 'mattresses/:id', component: ProductComponent},
  {path: 'mattress-bases', component: ProductsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
