import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../layouts/post-card/post-card.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  featuredArray: any = [];
  LatestArray: any = [];
  constructor(private postService: PostsService){
  
  }
async ngOnInit(): Promise<void> {
  this.featuredArray = await this.postService.loadFeatured();
  this.LatestArray=await this.postService.loadLatest();
}
}
