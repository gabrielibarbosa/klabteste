import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdutos } from '../interfaces/produtos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<IProdutos[]> {
    return this.http.get<IProdutos[]>('produtos');
  }

}
