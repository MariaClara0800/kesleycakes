package com.javaDoceria.doceria20.controller;

import com.javaDoceria.doceria20.business.CompraService;
import com.javaDoceria.doceria20.infrastructure.entitys.Compra;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")

public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }


    @PostMapping
    public ResponseEntity<Compra> criarCompra(@RequestBody Compra compra) {
        Compra salva = compraService.salvarCompra(compra);
        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public ResponseEntity<List<Compra>> listarCompras() {
        return ResponseEntity.ok(compraService.listarCompras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> buscarCompra(@PathVariable String id) {
        Compra compra = compraService.buscarPorId(id);
        return ResponseEntity.ok(compra);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCompra(@PathVariable String id) {
        compraService.deletarCompra(id);
        return ResponseEntity.ok().build();
    }
}
