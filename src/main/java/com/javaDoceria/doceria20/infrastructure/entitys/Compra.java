package com.javaDoceria.doceria20.infrastructure.entitys;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "compras") // Substitui @Entity e @Table
public class Compra {

    @Id // Anotação do Spring Data para o ID
    private String id; // IDs do MongoDB são tipicamente Strings

    // 1. Relação com Usuário (Substitui @ManyToOne)
    // Armazenamos apenas o ID do usuário que fez a compra
    @Field("usuario_id")
    private String usuarioId;

    // 2. Relação com Doces (Substitui @ManyToMany)
    // Armazenamos uma lista dos IDs dos doces comprados
    @Field("doceria_ids")
    private List<String> doceriaIds;

    @Field("data_compra") // Mapeamento para o campo no documento
    private LocalDateTime dataCompra;

    @Field("valor_total") // Mapeamento para o campo no documento
    private Double valorTotal;
}