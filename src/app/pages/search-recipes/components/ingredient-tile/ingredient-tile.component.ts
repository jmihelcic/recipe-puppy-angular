import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '@core/models/recipe/ingredient';

@Component({
    selector: 'app-ingredient-tile',
    templateUrl: './ingredient-tile.component.html',
    styleUrls: ['./ingredient-tile.component.styl']
})
export class IngredientTileComponent implements OnInit {
    @Input()
    ingredient: Ingredient;
    @Output()
    remove = new EventEmitter();
    @Output()
    toggle = new EventEmitter();

    get included() {
        return this.ingredient.included;
    }

    constructor() {}

    ngOnInit() {}
}
