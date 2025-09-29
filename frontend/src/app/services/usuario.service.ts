import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly base = '/usuario';

  constructor(private http: HttpClient) {}

  salvar(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.base, usuario);
  }

  buscarPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}?email=${encodeURIComponent(email)}`);
  }

  deletarPorEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${this.base}?email=${encodeURIComponent(email)}`);
  }

  atualizarPorId(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.base}?id=${id}`, usuario);
  }
}
