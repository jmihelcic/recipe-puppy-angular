import { Component, OnInit } from '@angular/core';
import {
    SearchRecipesService,
    FetchRecipesResponse
} from './search-recipes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
    startWith,
    debounceTime,
    skip,
    distinctUntilChanged,
    map,
    switchMap,
    tap,
    retry
} from 'rxjs/operators';
import { ApiReponse } from '@core/models/api-response/api-response';

@Component({
    selector: 'app-search-recipes',
    templateUrl: './search-recipes.component.html',
    styleUrls: ['./search-recipes.component.styl']
})
export class SearchRecipesComponent implements OnInit {
    searchForm: FormGroup;
    ingredientsForm: FormGroup;
    recipeList: any[] = [];
    paginationLocked = false;

    get currentPage() {
        if (this.searchForm != null) {
            return +this.searchForm.get('page').value;
        }

        return 0;
    }

    // Fetches only happen when a pagination event is raised
    // The event can be triggered by moving to a different page
    // or when ingredients / search text change, which will trigger
    // the pagination to reset to page 1
    paginationObservable: Observable<ApiReponse<FetchRecipesResponse>>;

    constructor(
        private service: SearchRecipesService,
        private fb: FormBuilder
    ) {
        this.initializeSearchForm();
        this.initializeIngredientsForm();
        this.setupFormChageObservable();
        this.setupPaginationObservable();
    }

    ngOnInit() {
        this.paginationObservable.subscribe(response => {
            if (response.isOK === true) {
                this.recipeList = response.payload.results;
            }
        });

        // Trigger initial load
        this.searchForm.get('page').setValue(1);
    }

    setupFormChageObservable() {
        combineLatest(
            this.searchForm
                .get('searchString')
                .valueChanges.pipe(startWith('')),
            this.ingredientsForm
                .get('ingredientList')
                .valueChanges.pipe(startWith([]))
        )
            .pipe(
                debounceTime(500),
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                skip(1)
            )
            .subscribe(changes => {
                // Reset the page to 1, triggering the event
                this.searchForm.get('page').setValue(1);
            });
    }

    setupPaginationObservable() {
        this.paginationObservable = this.searchForm
            .get('page')
            .valueChanges.pipe(
                tap(_ => (this.paginationLocked = true)),
                switchMap(values => {
                    const URL = this.service.extractFetchUrlFromForms(
                        this.searchForm,
                        this.ingredientsForm
                    );
                    return this.service.fetchRecipes(URL);
                }),
                tap(_ => (this.paginationLocked = false))
            );
    }

    // Events

    onClearSearch() {
        this.searchForm.patchValue(
            {
                searchString: ''
            },
            { emitEvent: false }
        );
    }

    onEnterPress() {
        const searchString = this.searchForm.get('searchString').value.trim();

        if (searchString.length === 0) {
            return;
        }

        this.service
            .fetchRecipes(`/api/?q=${searchString}&p=1`)
            .subscribe(response => {
                if (response.isOK) {
                    this.recipeList = response.payload.results;
                }
            });
    }

    onPagePrevious() {
        if (this.paginationLocked) {
            return;
        }

        const page = +this.searchForm.get('page').value;
        if (page === 1) {
            return;
        }

        this.searchForm.get('page').setValue(page - 1);
    }

    onPageNext() {
        if (this.paginationLocked) {
            return;
        }

        if (this.recipeList.length < 10) {
            return;
        }

        const page = +this.searchForm.get('page').value;
        this.searchForm.get('page').setValue(page + 1);
    }

    // Helpers

    initializeSearchForm() {
        this.searchForm = this.fb.group({
            searchString: ['', []],
            page: 1
        });
    }

    initializeIngredientsForm() {
        this.ingredientsForm = this.fb.group({
            ingredientInput: ['', []],
            ingredientList: this.fb.array([
                // this.fb.group({
                //     name: ['salt', []],
                //     included: [true, []]
                // })
            ])
        });
    }
}
