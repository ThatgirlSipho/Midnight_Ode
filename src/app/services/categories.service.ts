import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Firestore,collection, addDoc, collectionSnapshots, updateDoc,doc, deleteDoc,docData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:Firestore) { }

  loadData() {
    const categoriesCollection = collection(this.afs, 'categories');

    return collectionSnapshots(categoriesCollection).pipe(
      map(actions =>
        actions.map(a => {
          const data = a.data(); // Extract data
          const id = a.id; // Extract document ID
          return { id, ...data }; // Return object with ID and data
        })
      )
    );
  }


  
 
  
}
