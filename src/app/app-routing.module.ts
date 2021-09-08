import { ApplicationModule, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealsComponent } from "./meals/meals.component";

const routes: Routes = [
    {path: '', redirectTo: '/meal', pathMatch: 'full'},
    {path: 'meal', component: MealsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}