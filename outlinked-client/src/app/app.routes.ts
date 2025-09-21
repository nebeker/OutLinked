import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ContentGenerationComponent } from './content-generation/content-generation-component/content-generation-component';
import { UserInfoComponent } from './user-info/user-info-component/user-info-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generate', component: ContentGenerationComponent },
  { path: 'user-info', component: UserInfoComponent },
];
