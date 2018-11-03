import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe';

@Component({
    selector: 'app-recipe-tile',
    templateUrl: './recipe-tile.component.html',
    styleUrls: ['./recipe-tile.component.styl']
})
export class RecipeTileComponent implements OnInit {
    @Input()
    recipe: Recipe;

    constructor() {}

    ngOnInit() {}

    // Events

    onOpenExternalLink() {
        if (this.recipe.href == null) {
            return;
        }

        window.open(this.recipe.href, '_blank');
    }
}
