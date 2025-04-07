import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL,deleteObject } from '@angular/fire/storage';
import { Firestore,collection, query, where, addDoc, collectionSnapshots, updateDoc,doc, increment, deleteDoc , docData, limit, orderBy} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:Storage,private afs:Firestore,private toastr:ToastrService, private router:Router ) { }

  loadData() {
    const postsCollection = collection(this.afs, 'posts');

    return collectionSnapshots(postsCollection).pipe(
      map(actions =>
        actions.map(a => {
          const data = a.data(); 
          const id = a.id; 
          return { id, ...data }; 
        })
      )
    );

    



  }



  async loadFeatured() {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, where('isFeatured', '==', true),limit(4));
  
    const result = await firstValueFrom(
      collectionSnapshots(q).pipe(
        map(actions =>
          actions.map(a => {
            const data = a.data();
            const id = a.id;
            return { id, ...data };
          })
        )
      )
    );
  
    return result; // An array of all featured posts
  }


  async loadLatest() {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, orderBy('createdAt'));
  
    const result = await firstValueFrom(
      collectionSnapshots(q).pipe(
        map(actions =>
          actions.map(a => {
            const data = a.data();
            const id = a.id;
            return { id, ...data };
          })
        )
      )
    );
  
    return result; // An array of all featured posts
  }



  loadCat(categoryId: string) {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, where('category.categoryId', '==', categoryId));
    return collectionSnapshots(q).pipe(
      map(actions => actions.map(a => {
        const data = a.data();
        const id = a.id;
        return { id, ...data };
      }))
    );
  }
  
  loadPost(id: string) {
    const postDoc = doc(this.afs, `posts/${id}`);
    return docData(postDoc, { idField: 'id' }); // Adds `id` to the returned data
  }


  loadSimilar(categoryId: string) {
    const postsCollection = collection(this.afs, 'posts');
    const q = query(postsCollection, where('category.categoryId', '==', categoryId),limit(4));
    return collectionSnapshots(q).pipe(
      map(actions => actions.map(a => {
        const data = a.data();
        const id = a.id;
        return { id, ...data };
      }))
    );
  }

  async countViews(id: string): Promise<void> {
    try {
      const views = {
        views: increment(1)
      };
  
      const postDocRef = doc(this.afs, `posts/${id}`); // Reference to the document
      await updateDoc(postDocRef, views); // Await the update
    } catch (err) {
      console.error('Error updating views:', err);
    }
}

}