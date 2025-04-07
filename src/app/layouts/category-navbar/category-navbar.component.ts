import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent implements OnInit {
catArray:Array<any>=[]


constructor(private catService : CategoriesService){}



  ngOnInit(): void {
    this.catService.loadData().subscribe((val)=>{
      this.catArray=val
    })
  }
}
