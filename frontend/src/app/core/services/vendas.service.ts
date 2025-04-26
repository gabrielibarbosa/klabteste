import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVendas } from '../interfaces/vendas.interface';
import { Observable } from 'rxjs';
import { VendasDTO } from '../dto/vendas.dto';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  constructor(private http: HttpClient) {}

  getVendas(): Observable<IVendas[]> {
    return this.http.get<IVendas[]>('vendas');
  }

  insertVenda(venda: VendasDTO): Observable<any> {
    return this.http.put<any>('vendas', venda);
  }

}
