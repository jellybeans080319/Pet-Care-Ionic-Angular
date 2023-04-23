import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, docData, doc, addDoc, deleteDoc, updateDoc, query, where} from '@angular/fire/firestore'
import { Auth, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs'

export interface Note {
  id?: string;
  title: string;
  text: string;
  uid: string;
}

export interface UserInfo{
  id?: string;
  name: string;
  age: string;
  gender: string;
}

export interface Pet {
  id?: string;
  name: string;
  age: number;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private firestore: Firestore,
    private auth: Auth ) { }

  getNotes(uid: string): Observable<Note[]>{
    console.log(uid)
    const notesRef = query(
      collection(this.firestore, 'notes'),
      where('uid', '==', uid)
    )
    return collectionData(notesRef, { idField: 'id' })as Observable<Note[]>;
  }

  getPets(uid: string): Observable<Pet[]>{
    console.log(uid)
    const notesRef = query(
      collection(this.firestore, 'pets'),
      where('uid', '==', uid)
    )
    return collectionData(notesRef, { idField: 'id' })as Observable<Pet[]>;
  }

  getNoteById(id:any): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id'}) as Observable<Note>;
  }

  getPetById(id:any): Observable<Pet>{
    const noteDocRef = doc(this.firestore, `pets/${id}`);
    return docData(noteDocRef, { idField: 'id'}) as Observable<Pet>;
  }

  getUserInfo(uid: string): Observable<UserInfo[]>{
    console.log(uid)
    const userRef = query(
      collection(this.firestore, 'user'),
      where("uid", "==", uid)
    )
    return collectionData(userRef, {idField: 'id'}) as Observable<UserInfo[]>
  }

  addNote(title: string, text: string, userID: string){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, {
      title: title,
      text: text,
      uid: userID})
  }

  addPet(name: string, age: number, userID: string ){
    const notesRef = collection(this.firestore, 'pets');
    return addDoc(notesRef, {
      name:name,
      age: age,
      uid: userID
    })
  }

  addUser(fullName: string, age: number, sex: string, email: string, userID: string){
    const userRef = collection(this.firestore, 'user')
    return addDoc(userRef, {
      name: fullName,
      age: age,
      sex: sex,
      email: email,
      uid: userID
    })
  }

  deleteNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  deletePet(pet: Pet){
    const noteDocRef = doc(this.firestore, `pets/${pet.id}`);
    return deleteDoc(noteDocRef);
  }

  updatePet(pet: Pet){
    const noteDocRef = doc(this.firestore, `pets/${pet.id}`);
    return updateDoc(noteDocRef, {name: pet.name, age: pet.age});
  }

  updateProfile(docID: string, name: string, age: string, sex: string, email:string){
    const profileRef = doc(this.firestore, `user/${docID}`)
    return updateDoc(profileRef, {
      name: name,
      age: age,
      sex: sex,
      email: email  
    })
  }

  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {title: note.title, text: note.text});
  }

  logout() {
    return signOut(this.auth);
  }
}
