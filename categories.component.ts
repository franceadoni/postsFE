import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/category.model';
import { CategoriesService, } from './categories.service';
import { CategoriesStore, } from './categories.store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categories: Category[] = []

  constructor(
    public categoriesStore: CategoriesStore,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.categoriesService.loadAll();
  }

}
