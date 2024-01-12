import { Component } from '@angular/core';
import { CategoryDto } from 'src/models/CategoryDto';
import { SnackboxService } from 'src/serivces/snackbox.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categories: CategoryDto[] = [];

  constructor(private snackboxService: SnackboxService) { }


  ngOnInit(): void {

    this.snackboxService.getAllCategories().subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);

    });
  }

}
