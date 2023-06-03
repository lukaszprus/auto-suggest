import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Search } from './auto-suggest/auto-suggest.component';

interface Character { id: number; name: string; }

interface Comic { id: number; title: string; }

interface Response<T> {
  data: {
    results: T[]
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  endpoint = 'http://gateway.marvel.com/v1/public/';
  apiKey = '?apikey=21b4c2a647137eb3414b99052a939ab4';

  characterSearch: Search<Character>;
  comicSearch: Search<Comic>;

  constructor(http: HttpClient) {
    this.characterSearch = term => http.get<Response<Character>>(`${this.endpoint}characters${this.apiKey}&nameStartsWith=${term}`).pipe(
      map(characters => characters.data.results.map(character => ({ value: character, label: character.name })))
    );

    this.comicSearch = term => http.get<Response<Comic>>(`${this.endpoint}comics${this.apiKey}&titleStartsWith=${term}`).pipe(
      map(comics => comics.data.results.map(comic => ({ value: comic, label: comic.title })))
    );
  }

  onItemSelect(item: any) {
    console.log(item);

    window.alert(JSON.stringify(item));
  }
}
