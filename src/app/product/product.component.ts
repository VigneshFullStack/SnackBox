import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  goToProductDetails(id: number) {
    this.router.navigate(['category', id], { relativeTo: this.route }); // 'details/:id'
  }
}
