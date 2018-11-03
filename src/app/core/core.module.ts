import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot([]), HttpClientModule],
    exports: [RouterModule]
})
export class CoreModule {}
