// rectangle-config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, filter, switchMap, take } from 'rxjs/operators';
import { RectangleDimensions } from '../rectangle/rectangle-dimensions.model';

@Injectable({
  providedIn: 'root'
})
export class RectangleConfigService {
  private apiUrl: string;
  private apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.http.get<any>('assets/config.json').pipe(
      catchError(error => {
        console.error('Error loading app config:', error);
        return [];
      })
    ).subscribe((config: any) => {
      this.apiUrl = config.apiBaseUrl;
      this.apiUrlSubject.next(this.apiUrl);
    });
  }

  getInitialDimensions(): Observable<RectangleDimensions> {
    return this.apiUrlSubject.pipe(
      filter(apiUrl => !!apiUrl), // Filter out falsy apiUrl values
      take(1), // Take the first apiUrl value emitted
      switchMap(() => {
        if (!this.apiUrl) {
          throw new Error('API base URL not loaded');
        }
        return this.http.get<RectangleDimensions>(`${this.apiUrl}/rectangle/initial-dimensions`).pipe(
          catchError(error => {
            console.error('Error fetching initial dimensions:', error);
            // Handle the error appropriately, either return a default value or re-throw the error
            return throwError('Error fetching initial dimensions. Please try again.');
          })
        );
      })
    );
  }


  updateDimensions(dimensions: RectangleDimensions): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json' 
        })
    };
    return this.apiUrlSubject.pipe(
      switchMap(apiUrl => {
          if (!apiUrl) {
              console.error('API URL not available.');
              return throwError('API URL not available.');
          }

          return this.http.put(`${apiUrl}/rectangle/update-dimensions`, dimensions);
      }),
      catchError((error: any) => {
          console.error('Error updating dimensions:', error);
          return throwError('Error updating dimensions. Please try again.');
      })
  );
}
}
