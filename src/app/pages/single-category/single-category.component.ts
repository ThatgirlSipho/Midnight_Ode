import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../layouts/post-card/post-card.component";
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, CommonModule, RouterModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit {
catname:any;
catArray: any = [];
  constructor(private postService: PostsService, private route: ActivatedRoute){}


  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.catname=val
      // Subscribe to loadCat observable and handle the data inside the subscribe callback
      this.postService.loadCat(val['id']).subscribe((data) => {
        this.catArray = data;
        
        console.log('Fetched category posts:', this.catArray); // This will log once the data is available
      });
    });
  }
}
