import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { IngredientListComponent } from './search-recipes/components/ingredient-list/ingredient-list.component';
import { IngredientInputComponent } from './search-recipes/components/ingredient-input/ingredient-input.component';

@NgModule({
    declarations: [SearchRecipesComponent, IngredientListComponent, IngredientInputComponent],
    imports: [CommonModule, SharedModule, PagesRoutingModule]
})
export class PagesModule {}
