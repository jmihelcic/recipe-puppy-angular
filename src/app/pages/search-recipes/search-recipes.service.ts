import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ServerService } from '@core/services/server.service';

@Injectable({
    providedIn: 'root'
})
export class SearchRecipesService {
    constructor(private server: ServerService) {}

    fetchRecipes(url: string) {
        return this.server.get(url);
    }
}
