package com.javaDoceria.doceria20.business;


import com.javaDoceria.doceria20.infrastructure.entitys.Compra;
import com.javaDoceria.doceria20.infrastructure.repository.CompraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompraService {

    private final CompraRepository compraRepository;

    public CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    public Compra salvarCompra(Compra compra) {
        return compraRepository.save(compra);
    }

    public List<Compra> listarCompras() {
        return compraRepository.findAll();
    }

    public Compra buscarPorId(String id) {
        return compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra não encontrada"));
    }

    public void deletarCompra(String id) {
        compraRepository.deleteById(id);
    }


}
