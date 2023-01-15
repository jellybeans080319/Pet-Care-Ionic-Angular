import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, docData, doc, addDoc, deleteDoc, updateDoc, query, where} from '@angular/fire/firestore'
import { Auth, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs'

export interface Note {
  id?: string;
  title: string;
  text: string;
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
  age: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
    private auth: Auth ) { }

  getNotes(): Observable<Note[]>{
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' })as Observable<Note[]>;
  }

  getNoteById(id:any): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id'}) as Observable<Note>;
  }

  addNote(note: Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note)
  }

  deleteNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {title: note.title, text: note.text});
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

  getUserInfo(uid: string): Observable<UserInfo[]>{
    console.log(uid)
    const userRef = query(
      collection(this.firestore, 'user'),
      where("uid", "==", uid)
    )
    return collectionData(userRef, {idField: 'id'}) as Observable<UserInfo[]>
   
    //code ni sir
    // let uid = sessionStorage.getItem('user_id')
    // const userRef = doc(this.firestore, `user/${uid}`)
    // console.log(userRef)
    // return docData(userRef)as Observable<UserInfo[]>;
    //return collectionData(userRef, { idField: 'uid' })as Observable<UserInfo[]>;
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

  logout() {
    return signOut(this.auth);
  }

}
