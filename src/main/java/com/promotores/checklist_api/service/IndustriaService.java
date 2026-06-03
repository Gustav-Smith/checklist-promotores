package com.promotores.checklist_api.service;

import com.promotores.checklist_api.dto.IndustriaDTO;
import com.promotores.checklist_api.entity.Industria;
import com.promotores.checklist_api.repository.IndustriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor   // Lombok: gera construtor com os campos final
public class IndustriaService {

    private final IndustriaRepository repository;

    public List<Industria> listarTodas() {
        return repository.findAll();
    }

    public Industria buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Indústria não encontrada"));
    }

    public Industria criar(IndustriaDTO dto) {
        if (repository.existsByNome(dto.getNome())) {
            throw new RuntimeException("Já existe uma indústria com esse nome");
        }
        Industria industria = new Industria();
        industria.setNome(dto.getNome());
        industria.setDescricao(dto.getDescricao());
        industria.setAtiva(true);
        return repository.save(industria);
    }

    public Industria atualizar(Long id, IndustriaDTO dto) {
        Industria industria = buscarPorId(id);
        industria.setNome(dto.getNome());
        industria.setDescricao(dto.getDescricao());
        return repository.save(industria);
    }

    public void deletar(Long id) {
        buscarPorId(id);   // valida se existe antes de deletar
        repository.deleteById(id);
    }
}