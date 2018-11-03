import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-ingredient-input',
    templateUrl: './ingredient-input.component.html',
    styleUrls: ['./ingredient-input.component.styl']
})
export class IngredientInputComponent implements OnInit {
    @Input()
    parentFormGroup: FormGroup;
    @Output()
    enterPress = new EventEmitter();
    @Output()
    escapePress = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
