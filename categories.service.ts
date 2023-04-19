import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/core/category.model";
import { environment } from "src/environments/environment";
import { CategoriesStore } from "./categories.store";

@Injectable({
    providedIn: 'root'
  })

  export class CategoriesService {
  
    constructor(
      private httpClient: HttpClient,
      private categoriesStore: CategoriesStore
    ) { }

    loadAll() {
        const url = environment.baseUrl + "/api/categories";
        this.httpClient.get<Category[]>(url).subscribe( data => this.categoriesStore.loadAll(data));
    }

  }