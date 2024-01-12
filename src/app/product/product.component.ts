import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private getCategory!: Subscription;
  data: { ItemTypes: { ItemType: string, Items: string }[] }[] = [];

  selectedItems: { [key: string]: string[] } = {};
  remainingItems: { [key: string]: number } = {};
  selectedItemsCount: { [key: string]: number } = {};

  selectedSnacks: any[] = [];
  count: number = 0;
  showCart: boolean = false;

  selectedCategory: Category | undefined;

  constructor(public router: Router, private snackboxService: SnackboxService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategories();
    console.log('selectedItems : ', this.selectedItems);
    this.getSelectedItemsCount();
    this.getSelectedItems();
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
    });
  }

  // goToCategoryDetails(id: number): void {
  //   this.getCategory = this.snackboxService.getCategoryById(id).subscribe((result: any) => {
  //     console.log('getCategoryById : ', result);
  //     this.data = result;

  //     // Initialize selectedItems and selectedValues for each accordion
  //     this.data.forEach((category: any, accordionIndex: number) => {
  //       const itemType = category.ItemTypes[0].ItemType;
  //       const items = category.ItemTypes[0].Items.split(',');
  //       this.selectedItems[itemType] = [];
  //       this.selectedItemsCount[itemType] = 0;
  //     });
  //   });
  // }

  goToCategoryDetails(id: number): void {
    this.getCategory = this.snackboxService.getCategoryById(id).subscribe((result: any) => {
      console.log('getCategoryById : ', result);
      this.data = result;

      // Reset selectedItems and selectedItemsCount for each accordion
      this.selectedItems = {};
      this.selectedItemsCount = {};

      // Reset selected items and counts for each accordion
      this.data.forEach((category: any, accordionIndex: number) => {
        const itemType = category.ItemTypes[0].ItemType;
        const items = category.ItemTypes[0].Items.split(',');
        this.selectedItems[itemType] = [];
        this.selectedItemsCount[itemType] = 0;

        // Set the selected category
        this.selectedCategory = this.categories.find(category => category.category_id === id);

        // Reset remaining items for each category
        if (itemType === 'Snack 1' || itemType === 'Snack 2') {
          this.remainingItems[itemType] = 3; // Adjust the default value based on your requirements
        } else if (itemType === 'Add on' || itemType === 'Dessert') {
          this.remainingItems[itemType] = 1; // Adjust the default value based on your requirements
        }

      });

      // Reset overall counts and showCart status
      this.count = 0;
      this.showCart = false;

      // Reset remainingItems for all categories
      // this.categories.forEach((category) => {
      //   this.remainingItems[category.category_name] = 3;  // Adjust the default value based on your requirements
      // });
    });
  }

  isSelected(itemType: string, item: string): boolean {
    return this.selectedItems[itemType]?.includes(item);
  }

  addToCart(itemType: string, item: string) {
    // Check if the item is already selected
    const itemAlreadySelected = this.selectedItems[itemType].indexOf(item) !== -1;

    // Check if the maximum selection count has not been reached for the current itemType
    const maxSelectionNotReached =
      (itemType === 'Snack 1') ? this.selectedItemsCount[itemType] < 3 :
        (itemType === 'Snack 2') ? this.selectedItemsCount[itemType] < 3 :
          (itemType === 'Add on') ? this.selectedItemsCount[itemType] < 1 :
            (itemType === 'Dessert') ? this.selectedItemsCount[itemType] < 1 :
              true;  // Default case

    if (maxSelectionNotReached && !itemAlreadySelected) {
      this.selectedItems[itemType].push(item);
      this.selectedItemsCount[itemType]++;
      this.count++;  // Increment the total count
    } else {
      console.log(`Item '${item}' is already added or max selection reached!`);
    }
    this.showCart = this.count > 0;


    if (!maxSelectionNotReached) {
      this.remainingItems[itemType] = 0;  // Set remaining items to 0
    } else {
      this.remainingItems[itemType] =
        (itemType === 'Snack 1') ? 3 - this.selectedItemsCount[itemType] :
          (itemType === 'Snack 2') ? 3 - this.selectedItemsCount[itemType] :
            (itemType === 'Add on' || itemType === 'Dessert') ? 1 - this.selectedItemsCount[itemType] : 0;
    }

    // Mark the selected item for highlighting
    this.selectedSnacks.push({ itemType, item });
  }

  // removeItem(item: any) {
  //   this.selectedItems[item.itemType].splice(this.selectedItems[item.itemType].indexOf(item.snack_name), 1);
  //   this.selectedItemsCount[item.itemType]--;
  //   this.remainingItems[item.itemType] = 3 - this.selectedItemsCount[item.itemType];
  //   console.log('selectedItems after remove : ', this.selectedItems);
  // }

  removeItem(category: string, index: number) {
    const selectedItem = this.selectedItems[category][index];
    this.selectedItems[category].splice(index, 1);
    this.selectedItemsCount[category]--;
    this.count--;  // Decrement the total count

    this.showCart = this.count > 0;

    if (this.remainingItems[category] !== undefined) {
      this.remainingItems[category] = this.selectedItemsCount[category] < 3 ? 3 - this.selectedItemsCount[category] : 0;
    }
  }


  removeCategory(category: string) {
    delete this.selectedItems[category];
    console.log('selectedItems after remove : ', this.selectedItems);
  }

  getSelectedItemsCount() {
    for (const key in this.selectedItems) {
      if (this.selectedItems.hasOwnProperty(key)) {
        this.count += this.selectedItems[key].length;
      }
    }
    return this.count;
  }

  SelectedItemsCount() {
    var ItemsCount = 0;
    for (const key in this.selectedItems) {
      if (this.selectedItems.hasOwnProperty(key)) {
        this.count += this.selectedItems[key].length;
        ItemsCount++;
      }
    }
    return ItemsCount;
  }


  getSelectedItems(): { category: string, items: string[] }[] {
    const result: { category: string, items: string[] }[] = [];

    for (const category in this.selectedItems) {
      result.push({ category, items: this.selectedItems[category] });
    }
    return result;
  }

  ngOnDestroy(): void {
    this.getAllData.unsubscribe();
  }
}
