package com.javaDoceria.doceria20.infrastructure.entitys;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "docerias") // Define a coleção no MongoDB
public class Doceria {

    @Id // Anotação do Spring Data para o ID
    private String id; // IDs do MongoDB são tipicamente Strings

    @Field("nome") // Mapeia o campo "nome" no documento
    private String nome;

    @Field("preco") // Mapeia o campo "preco" no documento
    private Double preco;

    @Field("quantidade") // Mapeia o campo "quantidade" no documento
    private Integer quantidade;
}