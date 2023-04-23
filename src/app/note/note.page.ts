import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage {
  uid: any 
  notes: any =[];
  // title:any = ""
  // text: any = ""
  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) {
      
//get notes
    this.uid = sessionStorage.getItem('user_id')
    this.dataService.getNotes(this.uid).subscribe(res =>{
      console.log(res);
      this.notes=res
    });
  }

  async openNote(note:any){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: note.id,},
      breakpoints: [0, 0.5, 0.8], //tapno ngumato ajay modal
      initialBreakpoint: 0.5 //deretso ngaton ajay modalen automatiken
    });
    await modal.present();
  }
  async openUser(user: any){
    const modal=await this.modalCtrl.create({
      component: ModalPage, componentProps:{
        id: user.uid
      }
    })
  }
  async addNote(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter note title',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Enter note text',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) =>{
            // console.log(res.title)
            // console.log(res.text)
            // console.log(this.uid)
            this.dataService.addNote(res.title, res.text, this.uid)
            //this.dataService.addNoteWithCustomId({title: res.title, text: res.text})
          }
        }
      ]
    });
    alert.present()

  }

}
