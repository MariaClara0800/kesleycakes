package com.javaDoceria.doceria20.infrastructure.repository;

import com.javaDoceria.doceria20.infrastructure.entitys.Compra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompraRepository extends MongoRepository<Compra, String> {
}
