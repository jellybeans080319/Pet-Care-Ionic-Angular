import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { getAuth } from 'firebase/auth';

@Injectable()
export class FirebaseAuthService {

  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();

  constructor(
    public angularFireAuth: AngularFireAuth,
    public platform: Platform
  ) { }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  signInWithEmail(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  signUpWithEmail(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
}
