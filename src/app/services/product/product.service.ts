import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {Product} from "../../interfaces/product";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/products';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(protected http: HttpClient, private storageService: StorageService) {

  }

  /** GET product list **/
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** POST add product **/
  addProduct(product: Product): Observable<Product> {
    if (this.storageService.isAuthenticated()) {
      const loggedUser = this.storageService.getCurrentLoggedUser();
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${loggedUser.token}`);
    }
    return this.http.post<Product>(this.url, product, this.httpOptions).pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    if (this.storageService.isAuthenticated()) {
      const loggedUser = this.storageService.getCurrentLoggedUser();
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${loggedUser.token}`);
    }

    const url = `${this.url}/${product.productId}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product.productId}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** DELETE product by id **/
  deleteProduct(id: number): Observable<Product> {
    if (this.storageService.isAuthenticated()) {
      const loggedUser = this.storageService.getCurrentLoggedUser();
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${loggedUser.token}`);
    }

    const url = `${this.url}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions).pipe(
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console instead
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
