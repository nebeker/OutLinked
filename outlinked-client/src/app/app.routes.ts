import { Routes } from '@angular/router';
import { ContentGenerationComponent } from './content-generation/content-generation-component/content-generation-component';
import { UserInfoComponent } from './user-info/user-info-component/user-info-component';

export const routes: Routes = [
    { path: "", component: ContentGenerationComponent},
    {path: "user-info", component: UserInfoComponent}
];
