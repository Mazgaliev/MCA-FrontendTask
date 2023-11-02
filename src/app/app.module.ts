import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AlbumComponent } from './components/home/album/album.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePhotoComponent } from './components/photo-main-view/create-photo/create-photo.component';
import { DeletePhotoComponent } from './components/photo-main-view/delete-photo/delete-photo.component';
import { EditPhotoComponent } from './components/photo-main-view/edit-photo/edit-photo.component';
import { ViewPhotosComponent } from './components/view-photos/view-photos.component';
import { canActivateViewPhotoGuard } from './guards/view-photo.guard';
import { LoadingComponentComponent } from './shared/components/loading-component/loading-component.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { albumResolve } from './shared/service/RouteResolver.service';
import { AppEffects } from './store/effects';
import { reducer } from './store/reducer';
import { PhotoMainViewComponent } from './components/photo-main-view/photo-main-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: "home", component: HomeComponent
  },
  {
    path: "view",
    canActivate: [canActivateViewPhotoGuard],

    children: [
      {
        path: ":albumId/photos", component: ViewPhotosComponent,
        resolve: { album: albumResolve }
      }
    ],

  },
  { path: ':photoId', component: PhotoMainViewComponent, outlet: 'modal' },

  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ViewPhotosComponent,
    HomeComponent,
    EditPhotoComponent,
    DeletePhotoComponent,
    LoadingComponentComponent,
    CreatePhotoComponent,
    PageNotFoundComponent,
    PhotoMainViewComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature('appState', reducer),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([AppEffects])

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
