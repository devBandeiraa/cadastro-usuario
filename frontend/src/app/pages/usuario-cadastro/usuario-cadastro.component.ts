import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent {
  feedback = '';
  loading = false;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private usuarioService: UsuarioService) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.feedback = '';
    this.usuarioService.salvar(this.form.value as any).subscribe({
      next: () => {
        this.feedback = 'Usuário cadastrado com sucesso!';
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        this.feedback = 'Erro ao cadastrar usuário.';
      }
    }).add(() => this.loading = false);
  }
}
