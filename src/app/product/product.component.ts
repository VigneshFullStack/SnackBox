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

  goToCategoryDetails(id: number): void {
    this.getCategory = this.snackboxService.getCategoryById(id).subscribe((result: any) => {
      console.log('getCategoryById : ', result);
      this.data = result;

      // Initialize selectedItems and selectedValues for each accordion
      this.data.forEach((category: any, accordionIndex: number) => {
        const itemType = category.ItemTypes[0].ItemType;
        const items = category.ItemTypes[0].Items.split(',');
        this.selectedItems[itemType] = [];
        this.selectedItemsCount[itemType] = 0;
      });
    });
  }

  addToCart(itemType: string, item: string) {
    console.log('first', itemType)
    // Check if the item is already selected
    var maxSelectionNotReached = false;
    var wishitem = 0;
    const itemAlreadySelected = this.selectedItems[itemType].indexOf(item) !== -1;
    if( itemType == 'Add on')    {
      maxSelectionNotReached = this.selectedItems[itemType].length <=1;
      wishitem = 1;
      console.log('Add on', maxSelectionNotReached)
    }
    if( itemType == 'Dessert')    {
      wishitem = 1;
      maxSelectionNotReached = this.selectedItems[itemType].length <=1;
      console.log('Dessert ', maxSelectionNotReached)
    }
    if( itemType == 'Snack 1')    {
      wishitem = 3;
      maxSelectionNotReached = this.selectedItems[itemType].length <=2;
      console.log('Snack 1', maxSelectionNotReached,this.selectedItems[itemType].length)
    }
    if( itemType == 'Snack 2')    {
      wishitem = 3;
      maxSelectionNotReached = this.selectedItems[itemType].length <=2;
      console.log('Snack 2', maxSelectionNotReached)
    }
    // Check if the maximum selection count has not been reached for the current itemType
    // const maxSelectionNotReached = this.selectedItemsCount[itemType] < 3;

    if (maxSelectionNotReached) {
      this.selectedItems[itemType].push(item);
      this.selectedItemsCount[itemType]++;
      this.SelectedItemsCount();
      console.log('selectedItems after add: ', this.selectedItems[itemType].length);
      console.log('this.selectedItemsCount[itemType]', this.selectedItemsCount[itemType])
    } else {
      console.log(`Item '${item}' is already added!`);
    }

    this.remainingItems[itemType] = wishitem - this.selectedItemsCount[itemType];
    console.log('wishitem', wishitem)
    console.log('this.remainingItems[itemType] ', this.remainingItems[itemType] )

    // Enable or disable buttons based on the maximum selection status
    this.categories.forEach((category) => {
      const maxSelectionReached = this.selectedItemsCount[category.category_name] ===  wishitem;
      const isEnabled = !maxSelectionReached || (category.category_name === itemType && this.selectedItems[itemType]?.includes(item));
      this.remainingItems[category.category_name] = isEnabled ?  wishitem - (this.selectedItemsCount[category.category_name] || 0) : 0;
    });
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
    this.remainingItems[category] = 3 - this.selectedItems[category].length;
    this.SelectedItemsCount();
    console.log('selectedItems after remove : ', this.selectedItems);
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

  SelectedItemsCount()  {
    var ItemsCount = 0;
    for (const key in this.selectedItems) {
      if (this.selectedItems.hasOwnProperty(key)) {
        this.count += this.selectedItems[key].length;
        ItemsCount ++;
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
