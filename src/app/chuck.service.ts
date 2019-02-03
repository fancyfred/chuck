import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CNJoke } from './cnJoke';


@Injectable({
  providedIn: 'root'
})
export class ChuckService {
  categories:string[] = [
    "explicit","dev","movie","food","celebrity","science","sport","political","religion","animal","history","music","travel","career","money","fashion"
  ];
  getCategories() {
    return this.categories;
  }
  getJoke() {
    return this.http.get<CNJoke>('https://api.chucknorris.io/jokes/random');
  }
  getJokeByCat(cat) {
    console.log(cat);
    return this.http.get<CNJoke>('https://api.chucknorris.io/jokes/random?category=' + cat);
  }

  constructor(private http:HttpClient) { }
}
