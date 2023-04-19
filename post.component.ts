import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/core/marca.model';
import { MarcheService } from './marche.service';
import { MarcheStore } from './marche.store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class PostsComponent implements OnInit {

  showToast = "";
categories: Category[] = [];

  constructor(
    private postsService: PostsService,
    public postsStore: PostsStore
  ) { }

  ngOnInit(): void {
    this.postsService.loadAll();
  }


  deletePost(post: Post) {
    if(confirm("Are you sure to delete " + post.nome + "?")) {
      this.postsService.delete(post);
      this.showToast = "Hai cancellato un elemento!";
      setTimeout(() => {this.showToast = ""}, 3000);
    }
  }

  savePost(form: NgForm) {
    if(this.postsStore.active.id) {
      this.updatePost(form);
    } else {
      this.addPost(form);
    }
  }

  updatePost(form: NgForm) {
    const newPost = {
      id: this.postsStore.active.id,

      title: form.value.title,
      author: form.value.author
    }
    this.postsService.updatePost(newPost);
    this.resetActive();
    this.showToast = "Hai modificato un elemento, hai fatto bene!";
    setTimeout(() => {this.showToast = ""}, 3000);
  }

  addPost(form: NgForm) {
    const newPost = {
      title: form.value.title,
      author: form.value.author
    }
    this.postsService.addPost(newPost);
    this.showToast = "Hai aggiunto un elemento, miao miao!";
    setTimeout(() => {this.showToast = ""}, 3000);
  }

  setActive(post: Post) {
    this.postsService.setActive(post);
  }

  resetActive() {
    this.postsService.resetActive();
  }

}
