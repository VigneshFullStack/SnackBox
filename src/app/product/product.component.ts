import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/models/Category';
import { SnackboxService } from 'src/serivces/snackbox.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  loading: boolean = true;
  private getAllData!: Subscription;
  categories: Category[] = [];
  id: number = 0;
  productId: number = 0; // assuming the id is a string, adjust as needed
  private getCategory!: Subscription;
  data: any[] = [];
  selectedItems: { [key: string]: boolean[] } = {};

  selectedSnacks:any[]= [];

  constructor(public router: Router, private snackboxService: SnackboxService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  categorySelected(categoryId: number) {
    console.log('Category selected:', categoryId, `category${categoryId}`);
    this.router.navigate([`category${categoryId}`]);
  }

  getAllCategories() {
    this.getAllData = this.snackboxService.getCategories().subscribe((result: any) => {
      this.categories = result;
      this.goToCategoryDetails(this.categories[0].category_id);
      console.log('this.allCategories : ', this.categories);
      this.loading = false;
    })
  }

  goToCategoryDetails(id: number): void {
    this.getCategory = this.snackboxService.getCategoryById(id).subscribe((result: any) => {
      console.log('getCategoryById : ', result);
      this.data = result;

      // Initialize selectedItems and selectedValues for each accordion
      this.data.forEach((category: any, accordionIndex: number) => {
        const itemType = category.ItemTypes[0].ItemType;
        const items = category.ItemTypes[0].Items.split(',');
        this.selectedItems[itemType] = Array(items.length).fill(false);
      });
    });
  }

  addToCart(snack_type:string, item: string): void {
    console.log('item', item);
    this.selectedSnacks.unshift({"snack_type": snack_type, "snack_name" : item});
    console.log('this.selectedSnacks', this.selectedSnacks);
  }

  removeItem(index: number) {
    this.selectedSnacks.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.getAllData.unsubscribe();
  }
}
