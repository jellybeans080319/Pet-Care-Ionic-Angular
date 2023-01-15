import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services2/data.service';
import { PetmodalPage } from '../petmodal/petmodal.page';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage  {
  pets: any =[];

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) {
    this.dataService.getNotes().subscribe(res =>{
      //console.log(res);
      this.pets=res;
    });
  }

  async openNote(pet:any){
    const modal = await this.modalCtrl.create({
      component: PetmodalPage,
      componentProps: {id: pet.id,},
      breakpoints: [0, 0.5, 0.8], //tapno ngumato ajay modal
      initialBreakpoint: 0.5 //deretso ngaton ajay modalen automatiken
    });
    await modal.present();
  }

  async addNote(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Pet Information',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter note title',
          type: 'text'
        },
        {
          name: 'age',
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
            this.dataService.addNote({title: res.name, text: res.age})
            //this.dataService.addNoteWithCustomId({title: res.title, text: res.text})
          }
        }
      ]
    });
    await alert.present();

  }

}
