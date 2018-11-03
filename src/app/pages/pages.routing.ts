import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: SearchRecipesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
