import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../layouts/post-card/post-card.component";
import { CommentFormComponent } from "../../comments/comment-form/comment-form.component";
import { CommentListComponent } from "../../comments/comment-list/comment-list.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostCardComponent, CommentFormComponent, CommentListComponent, CommonModule, RouterModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {
  simpost:any=[]
post: any ;
constructor(private postService: PostsService, private route: ActivatedRoute){

}

ngOnInit(): void {
  this.route.params.subscribe((val) => {
   this.postService.countViews(val['id']);
    // Subscribe to loadCat observable and handle the data inside the subscribe callback
    this.postService.loadPost(val['id']).subscribe((data) => {
      this.post = data;
      this.loadsimpost(this.post.category.categoryId);
    
       
    });
  });
}

loadsimpost(id:any){
  this.postService.loadSimilar(id).subscribe((val)=>
  {
this.simpost=val
  })
}
}
