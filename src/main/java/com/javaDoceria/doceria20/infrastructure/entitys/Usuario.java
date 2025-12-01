package com.javaDoceria.doceria20.infrastructure.entitys;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(collection = "usuarios") // 1. Anotação principal para MongoDB
public class Usuario {

    @Id // 2. Usa a anotação do Spring Data para o ID
    private String id; // 3. IDs do MongoDB são tipicamente Strings

    // 4. @Field é opcional, mas garante o nome do campo no documento
    @Field("nome")
    private String nome;

    @Field("telefone")
    private String telefone;
}