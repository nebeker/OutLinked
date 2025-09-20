import { Routes } from '@angular/router';
import { ContentGenerationComponent } from './content-generation/content-generation-component/content-generation-component';
import { UserInfoComponent } from './user-info/user-info-component/user-info-component';
import { ContentGenerationFormComponent } from './content-generation/content-generation-form/content-generation-form.component';
export const routes: Routes = [
    {path:"",component:ContentGenerationFormComponent},
    { path: "generate", component: ContentGenerationFormComponent},
    {path: "user-info", component: UserInfoComponent}
];
