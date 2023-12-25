import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class RequestHandler {

  /**
   * This is the base URL for the API.
   */
  private _api_uri: string = 'http://localhost:3000/api';

  constructor(
    // import HttpClient for sending HTTP requests
    private http: HttpClient
  ) {}


  /**
   * This function handles the errors that are thrown by the server.
   *    * 
   * @param data 
   * @param url 
   */
  handleErrors(data: any, url: string = '') {    
    if (data && data.hasOwnProperty('status')) {
      console.log('Response Status:', data.status);
    }

    switch (data.status) {
      case 200:
        console.log('Response Status:', data.status);
        break;

      case 201:
        console.log('Response Status:', data.status);
        break;

      case 400:
        throw new Error('Bad Request');
        
      case 401:
        throw new Error('Unauthorized');

      case 403:
        throw new Error('Forbidden');

      case 404:
        throw new Error('Not Found');

      case 500:
        throw new Error('Internal Server Error');
    }
  }

  /**
   * This function sends a POST request to the server.
   * URL in use is: http://localhost:3000/api + url
   * 
   * @param url 
   * @param body 
   * @returns
   */
  async POST(url: string, body: any) {
    try {

      /*
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const data: any = await this.http.post(this._api_uri + url, body, { headers }).toPromise();
      */

      const data: any = await this.http
        .post(this._api_uri + url, body)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * This function sends a GET request to the server.
   * URL in use is: http://localhost:3000/api + url
   * 
   * @param url 
   * @returns 
   */
  async GET(url: string) {
    try {

      /*
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const data: any = await this.http.get(this._api_uri + url, { headers }).toPromise();
      */

      const data: any = await this.http.get(this._api_uri + url).toPromise();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * This function sends a PUT request to the server.
   * URL in use is: http://localhost:3000/api + url
   * 
   * @param url 
   * @param body 
   * @returns 
   */
  async PUT(url: string, body: any) {
    try {

      /*
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const data: any = await this.http.put(this._api_uri + url, body, { headers }).toPromise();
      */

      const data: any = await this.http
        .put(this._api_uri + url, body)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * This function sends a DELETE request to the server.
   * URL in use is: http://localhost:3000/api + url
   * 
   * @param url 
   * @returns 
   */
  async DELETE(url: string) {
    try {

      /*
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const data: any = await this.http.delete(this._api_uri + url, { headers }).toPromise();
      */

      const data: any = await this.http.delete(this._api_uri + url).toPromise();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
