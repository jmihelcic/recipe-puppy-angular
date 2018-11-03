import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';

@NgModule({
    declarations: [SearchRecipesComponent],
    imports: [CommonModule, SharedModule, PagesRoutingModule]
})
export class PagesModule {}
