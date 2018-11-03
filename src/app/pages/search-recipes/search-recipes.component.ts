import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from './search-recipes.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-search-recipes',
    templateUrl: './search-recipes.component.html',
    styleUrls: ['./search-recipes.component.styl']
})
export class SearchRecipesComponent implements OnInit {
    searchForm: FormGroup;
    recipeList: any[];

    constructor(
        private service: SearchRecipesService,
        private fb: FormBuilder
    ) {
        this.initializeSearchForm();
    }

    ngOnInit() {
        // console.log('test fetch');
        // this.service
        //     .fetchRecipes('/api/?q=&i=onions,garlic&p=1')
        //     .subscribe(response => {
        //         console.log('got response: ', response);
        //     });
    }

    // Events

    onEnterPress() {
        const searchString = this.searchForm.get('searchString').value.trim();

        if (searchString.length === 0) {
            return;
        }

        this.service
            .fetchRecipes(`/api/?q=${searchString}&p=1`)
            .subscribe(response => {
                console.log('got response: ', response);

                if (response.isOK) {
                    this.recipeList = response.payload.results;
                }
            });
    }

    // Helpers

    initializeSearchForm() {
        this.searchForm = this.fb.group({
            searchString: ['', []]
        });
    }
}
