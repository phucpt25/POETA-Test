import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Meal } from "../models/meal";

@Injectable({
    providedIn: 'root'
})
export class MealService{
    
  constructor(private http: HttpClient) { }
    searchMeal(key: string) {
        return this.http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
    }
    
}