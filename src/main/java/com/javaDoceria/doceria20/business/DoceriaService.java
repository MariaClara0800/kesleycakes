package com.javaDoceria.doceria20.business;

import com.javaDoceria.doceria20.infrastructure.entitys.Doceria;
import com.javaDoceria.doceria20.infrastructure.repository.DoceriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoceriaService {

    private final DoceriaRepository repository;

    // ✅ Injeção por construtor
    public DoceriaService(DoceriaRepository repository) {
        this.repository = repository;
    }

    public Doceria salvarDoceria(Doceria doceria) {
        return repository.save(doceria);
    }

    public List<Doceria> listarDocerias() {
        return repository.findAll();
    }

    public Doceria buscarPorId(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doceria não encontrada"));
    }

    public Doceria atualizarDoceria(String id, Doceria doceriaAtualizada) {
        Doceria existente = buscarPorId(id);

        // exemplo de atualização de campos
        existente.setNome(doceriaAtualizada.getNome());
        // se tiver outros atributos, atualize também
        // existente.setEndereco(doceriaAtualizada.getEndereco());

        return repository.save(existente);
    }

    public void deletarDoceria(String id) {
        repository.deleteById(id);
    }
}
