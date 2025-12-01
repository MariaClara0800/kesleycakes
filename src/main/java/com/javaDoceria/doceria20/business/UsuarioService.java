package com.javaDoceria.doceria20.business;

import com.javaDoceria.doceria20.infrastructure.entitys.Usuario;
import com.javaDoceria.doceria20.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    // Injeção via construtor (Spring vai injetar automaticamente)
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Usuario buscarPorId(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public void deletarUsuario(String id) {
        repository.deleteById(id);
    }
}
