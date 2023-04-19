import { Injectable } from "@angular/core";
import { Category } from "src/app/core/category.model";

@Injectable({
    providedIn: 'root'
  })

  export class CategoriesStore {

    categories: Category[] = []

    loadAll(categories: Category[]) {
        this.categories = categories;

    }
    
  }