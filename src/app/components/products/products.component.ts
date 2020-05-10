import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {ActivatedRoute} from '@angular/router';
import {Product} from "../../interfaces/product";
import Pluralize from 'pluralize';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  public addProductForm: FormGroup;
  public products: Product[];
  public productType: string;
  public showAdminOptions: boolean;
  public path: string;

  constructor(
    private formBuilder: FormBuilder,
    protected productService: ProductService,
    protected storageService: StorageService,
    private route: ActivatedRoute,
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.path = this.route.snapshot.routeConfig.path;

    // Check if Add product form can be shown
    this.showAdminOptions = this.storageService.isAuthenticated() && this.path as unknown as boolean;

    // Get and filter products by section
    this.productType = this.path ? Pluralize.singular(this.path) : '';
    this.productService.getProducts().subscribe((data) => {
        this.products = data.filter((element, index, array) => {
          return element.type == this.productType || !this.productType;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /** User login **/
  add(): void {
    if (this.addProductForm.valid) {
      let product = {
        name: this.addProductForm.value.name,
        brand: this.addProductForm.value.brand,
        description: this.addProductForm.value.description,
        price: this.addProductForm.value.price,
        imageUrl: this.addProductForm.value.imageUrl,
        type: this.productType
      };

      this.productService.addProduct(product)
        .subscribe(data => {
          this.products.push(data);
        });
    }
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.productId).subscribe();
  }
}
