package com.javaDoceria.doceria20.infrastructure.repository;

import com.javaDoceria.doceria20.infrastructure.entitys.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}
