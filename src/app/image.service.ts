import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchByPhotoComponent } from './search-by-photo/search-by-photo.component';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private endpoint: string = 'http://83.212.109.205:50/';

  constructor(private http: HttpClient) {

   }
   


examineImage(file : File): Observable<any> {

  let formData = new FormData();
  formData.append('file', file);

  console.log("file in service", file);

  return this.http.post(this.endpoint + 'predict_dl',
   formData
  ).pipe(catchError((error: any) => {
    console.error(error);
    return of(null);
  }));
}
}

