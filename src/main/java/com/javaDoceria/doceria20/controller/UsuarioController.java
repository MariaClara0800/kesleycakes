package com.javaDoceria.doceria20.controller;

import com.javaDoceria.doceria20.business.UsuarioService;
import com.javaDoceria.doceria20.infrastructure.entitys.Usuario;
import com.javaDoceria.doceria20.infrastructure.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {

    @Autowired
    private final UsuarioService usuarioService;
    private final UsuarioRepository repository;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository repository) {
        this.usuarioService = usuarioService;
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> salvarUsuario(@RequestBody Usuario usuario){
        usuarioService.salvar(usuario);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<Usuario>> buscarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarPorId(@RequestParam String id){
        usuarioService.deletarUsuario(id);
        return ResponseEntity.ok().build();
    }
}
