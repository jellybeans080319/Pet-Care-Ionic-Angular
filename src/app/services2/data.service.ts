import { Injectable } from '@angular/core';
import { Firestore, 
  collection, 
  collectionData, 
  setDoc, 
  docData, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc } from '@angular/fire/firestore'
  
import { Observable } from 'rxjs'

export interface Pet {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore ) { }

  getNotes(): Observable<Pet[]>{
    const notesRef = collection(this.firestore, 'pets');
    return collectionData(notesRef, { idField: 'id' })as Observable<Pet[]>;
  }

  getNoteById(id:any): Observable<Pet>{
    const noteDocRef = doc(this.firestore, `pets/${id}`);
    return docData(noteDocRef, { idField: 'id'}) as Observable<Pet>;
  }

  addNote(pet: Pet){
    const notesRef = collection(this.firestore, 'pets');
    return addDoc(notesRef, pet)
  }
  // addNoteWithCustomId(note: Note){
  //   const noteDocRef = doc(this.firestore, "notes", "note1");
  //   return setDoc(noteDocRef, note)
  // }

  deleteNote(pet: Pet){
    const noteDocRef = doc(this.firestore, `pets/${pet.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(pet: Pet){
    const noteDocRef = doc(this.firestore, `pets/${pet.id}`);
    return updateDoc(noteDocRef, {title: pet.title, text: pet.text});
  }

}
