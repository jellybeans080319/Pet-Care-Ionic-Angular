import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { DataService } from '../services/data.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid: any
  user: any = []
  name: any = ""
  age: any = ""
  sex: any = ""
  email: any = ""
  

  profile: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireauthService: FirebaseAuthService,
    private dataService: DataService,

    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) {
   // this.uid = +this.route.snapshot.paramMap.get('uid');
    this.uid = sessionStorage.getItem('user_id')
    this.avatarService.getUserProfile().subscribe((data: any) => {
       this.profile = data;
     });

     //get user info from database
    this.dataService.getUserInfo(this.uid).subscribe(res => {
      this.user = res
      this.name = this.user[0].name
      this.age = this.user[0].age
      this.sex = this.user[0].sex
      this.email = this.user[0].email
    })
  }


  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  update(){
    this.dataService.updateProfile(this.user[0].id, this.name, this.age, this.sex, this.email)
  }

  ngOnInit() {
    sessionStorage.getItem('user_id')
  }
}
