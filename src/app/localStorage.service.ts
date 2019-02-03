import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
	prefix:string = 'chuck';
	update(jokeList:any[]) {
		localStorage.setItem(this.prefix, JSON.stringify(jokeList));
	}
	
	loadFaves():any[] {
		const jokes = JSON.parse(localStorage.getItem(this.prefix)); 
			return jokes? jokes : [];
  }

	clearAll() {
		localStorage.clear();
	}
}
