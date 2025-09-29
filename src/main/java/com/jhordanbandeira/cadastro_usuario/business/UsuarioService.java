package com.jhordanbandeira.cadastro_usuario.business;


import com.jhordanbandeira.cadastro_usuario.infraestructure.entitys.Usuario;
import com.jhordanbandeira.cadastro_usuario.infraestructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public void salvarUsuario(Usuario usuario){
        repository.saveAndFlush(usuario);
    }

    public Usuario buscarUsuarioPorEmail(String email){

        return repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Email não encontrado")
        );
    }

    public void deletarUsuarioPorEmail(String email){
        repository.deleteByEmail(email);
    }

    public void atualizarUsuarioPorId(Integer id, Usuario usuario){
        Usuario usuarrioEntity = repository.findById(id).orElseThrow( () ->
                new RuntimeException("Usuário não encontrado"));
        Usuario usuarioAtualizado = Usuario.builder()

                .email(usuario.getEmail() != null ? usuario.getEmail() :
                        usuarrioEntity.getEmail())
                .nome(usuario.getNome() != null ? usuario.getNome() :
                        usuarrioEntity.getNome())
                .id(usuarrioEntity.getId())
                .build();

        repository.saveAndFlush(usuarioAtualizado);
    }
}
