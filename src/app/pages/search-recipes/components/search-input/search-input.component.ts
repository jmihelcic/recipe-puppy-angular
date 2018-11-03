import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.styl']
})
export class SearchInputComponent implements OnInit {
    @Input()
    parentFormGroup: FormGroup;
    @Output()
    escapePress = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
