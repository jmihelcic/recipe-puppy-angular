import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.styl']
})
export class IngredientListComponent implements OnInit {
    @Input()
    ingredientsForm: FormGroup;

    get ingredientList() {
        return this.ingredientsForm.get('ingredientList') as FormArray;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    // Events
    onAddIngredient() {
        const value = this.ingredientsForm.get('ingredientInput').value.trim();

        if (value.length === 0) {
            return;
        }

        this.ingredientList.push(
            this.fb.group({
                name: [value, []],
                included: [true, []]
            })
        );

        this.ingredientsForm.patchValue(
            {
                ingredientInput: ''
            },
            { emitEvent: false }
        );
    }

    onCancelAddIngredient() {
        this.ingredientsForm.patchValue(
            {
                ingredientInput: ''
            },
            { emitEvent: false }
        );
    }

    onToggleIngredientInclusion(index: number) {
        const ingredient = this.ingredientList.controls[index];
        ingredient.patchValue({
            included: !ingredient.get('included').value
        });
    }

    onRemoveIngredient(index: number) {
        this.ingredientList.removeAt(index);
    }

    // Helpers
}
