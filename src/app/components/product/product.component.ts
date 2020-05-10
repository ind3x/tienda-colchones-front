import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {Location} from '@angular/common';
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  public product = {};
  public showAdminOptions: boolean;
  public showInputs: boolean = false;

  constructor(
    protected productService: ProductService,
    protected storageService: StorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    // Check if Add product form can be shown
    this.showAdminOptions = this.storageService.isAuthenticated();

    // Get Product
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe((data) => {
        this.product = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /** Delete product **/
  delete(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(id).subscribe();
    this.goBack();
  }

  /** Go back to last location **/
  goBack(): void {
    this.location.back();
  }

  /** Make details editable **/
  editable(): void {
    this.showInputs = true;
  }

  /** Update the product **/
  update(product: Product): void {
    this.productService.updateProduct(product).subscribe(data => {
      this.product = data;
      this.showInputs = false;
    });
  }
}
