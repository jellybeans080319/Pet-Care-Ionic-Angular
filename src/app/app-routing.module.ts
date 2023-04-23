import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs-page',
    loadChildren: () => import('./tabs-page/tabs-page.module').then(m => m.TabsPagePageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'cats',
    loadChildren: () => import('./cats/cats.module').then( m => m.CatsPageModule)
  },
  {
    path: 'dogs',
    loadChildren: () => import('./dogs/dogs.module').then( m => m.DogsPageModule)
  },
  {
    path: 'bird',
    loadChildren: () => import('./bird/bird.module').then( m => m.BirdPageModule)
  },
  {
    path: 'horse',
    loadChildren: () => import('./horse/horse.module').then( m => m.HorsePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
