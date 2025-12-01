package com.javaDoceria.doceria20.controller;

import com.javaDoceria.doceria20.business.DoceriaService;
import com.javaDoceria.doceria20.infrastructure.entitys.Doceria;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/docerias")

public class DoceriaController {

    private final DoceriaService doceriaService;

    public DoceriaController(DoceriaService doceriaService) {
        this.doceriaService = doceriaService;
    }

    @GetMapping
    public List<Doceria> listar() {
        return doceriaService.listarDocerias();
    }

    @PostMapping
    public Doceria salvar(@RequestBody Doceria doceria) {
        return doceriaService.salvarDoceria(doceria);
    }

    @GetMapping("/{id}")
    public Doceria buscarPorId(@PathVariable String id) {
        return doceriaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Doceria atualizar(@PathVariable String id, @RequestBody Doceria doceriaAtualizada) {
        return doceriaService.atualizarDoceria(id, doceriaAtualizada);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id) {
        doceriaService.deletarDoceria(id);
    }
}


