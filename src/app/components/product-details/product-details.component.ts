import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct = new Product();
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(Number(this.route.snapshot.paramMap.get('id')));
  }

  getProduct(id:number): void {
    this.productService.read(id)
      .subscribe(
        product => {
          this.currentProduct = product;
          console.log(product);
        },
        error => {
          console.log(error);
        });
  }

  setAvailableStatus(status:boolean): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      available: status
    };

    this.productService.update(this.currentProduct.id!, data)
      .subscribe(
        response => {
          this.currentProduct.available = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.productService.update(this.currentProduct.id!, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id!)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

}
