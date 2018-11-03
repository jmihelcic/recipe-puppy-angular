import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ServerService } from '@core/services/server.service';
import { Recipe } from '@core/models/recipe/recipe';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class SearchRecipesService {
    constructor(private server: ServerService) {}

    fetchRecipes(url: string) {
        return this.server.get<FetchRecipesResponse>(url, 2);
    }

    // Helpers

    extractFetchUrlFromForms(
        searchForm: FormGroup,
        ingredientsForm: FormGroup
    ) {
        const searchString = searchForm.get('searchString').value.trim();
        const page = +searchForm.get('page').value;
        const ingredientsList = ingredientsForm.get(
            'ingredientList'
        ) as FormArray;

        const ingredients = ingredientsList.controls
            .map(ingredient => {
                const name = ingredient.get('name').value;
                const included = ingredient.get('included').value;

                return included === true ? name : '-' + name;
            })
            .join(',');

        return `/api/?q=${searchString}&i=${ingredients}&p=${page}`;
    }
}

// Response Interfaces

export interface FetchRecipesResponse {
    title: string;
    version: number;
    href: string;
    results: Recipe[];
}
