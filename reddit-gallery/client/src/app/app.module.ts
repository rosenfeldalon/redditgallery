import { NgModule } from 'angular-ts-decorators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import {HeaderComponent} from './header/header.component';
import {ImageService} from './image.service';
import './styles.css';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GalleryComponent,
    HeaderComponent
  ],
  providers: [
    ImageService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
