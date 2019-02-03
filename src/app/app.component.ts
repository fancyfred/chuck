import { Component } from '@angular/core';
import { ChuckService } from './chuck.service';
import { CNJoke } from './cnJoke';
import { LocalStorageService } from './localStorage.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loading:boolean = false;
  baseUrl:string = environment.baseUrl;

  faves:any[] = this.loadFaves();
  loadFaves():any[] {
    return this.localStorageService.loadFaves();
  }
  savedJoke: {id:number, value:string};
  errMsg:string = '';
  joke:CNJoke = 
    {
      "category":"",
      "icon_url": "",
      "id":0,
      "url":"",
      "value":""
  };
  categories:string[] = this.chuckService.getCategories();
  getJoke() {
    this.errMsg = '';
    this.loading = true;
    this.joke.value = '';
    this.chuckService.getJoke()
      .subscribe(
        (joke) => {
          this.joke = joke;
          this.loading = false;
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errMsg = "Sorry, the Chuck Norris Joke service isn't responding.";
        }
      )
  }
  getJokeByCat(cat:string) {
    this.joke.value = '';
    this.errMsg = '';
    this.loading = true;
    this.chuckService.getJokeByCat(cat)
      .subscribe(
        (joke) => {
          this.joke = joke;
          this.loading = false;
        }
      )
  }

  alreadyInFaves(id:number) {
    let match = false;
    for (let i = 0; i < this.faves.length; i++) {
      if(!match) {
        if(id === this.faves[i].id) {
          match = true;
        }
      }
    }
    return match;
  }

  addToFaves() {
    if(!this.alreadyInFaves(this.joke.id)) {
      this.faves.push({id:this.joke.id,value:this.joke.value});
      this.localStorageService.update(this.faves);
      this.faves = this.loadFaves();  
    } else {
      this.errMsg = "You've already faved this gem!";
      setTimeout(function() {
        this.errMsg = "";
      }, 1000);  
    }
  }
  removeFromFaves(joke:any) {
    if(this.alreadyInFaves(joke.id)) {
      this.faves.splice(this.faves.indexOf(joke), 1);
      this.localStorageService.update(this.faves);
      this.faves = this.loadFaves();  
    }
  }

  clearAll() {
    this.localStorageService.clearAll();
    this.faves = []; 
  }
  constructor(private chuckService:ChuckService, private localStorageService:LocalStorageService) { }

}
