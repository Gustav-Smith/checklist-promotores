package com.promotores.checklist_api.service;

import com.promotores.checklist_api.dto.ItemChecklistDTO;
import com.promotores.checklist_api.entity.ItemChecklist;
import com.promotores.checklist_api.entity.Visita;
import com.promotores.checklist_api.repository.ItemChecklistRepository;
import com.promotores.checklist_api.repository.VisitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemChecklistService {

    private final ItemChecklistRepository repository;
    private final VisitaRepository visitaRepository;

    public List<ItemChecklist> listarPorVisita(Long visitaId) {
        Visita visita = visitaRepository.findById(visitaId)
                .orElseThrow(() -> new RuntimeException("Visita não encontrada"));
        return repository.findByVisitaOrderByOrdem(visita);
    }

    public ItemChecklist buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }

    public ItemChecklist criar(ItemChecklistDTO dto) {
        Visita visita = visitaRepository.findById(dto.getVisitaId())
                .orElseThrow(() -> new RuntimeException("Visita não encontrada"));

        ItemChecklist item = new ItemChecklist();
        item.setVisita(visita);
        item.setTarefa(dto.getTarefa());
        item.setConcluido(false);
        item.setObservacao(dto.getObservacao());
        item.setOrdem(dto.getOrdem());
        return repository.save(item);
    }

    public ItemChecklist marcarConcluido(Long id, String observacao) {
        ItemChecklist item = buscarPorId(id);
        item.setConcluido(true);
        item.setObservacao(observacao);
        return repository.save(item);
    }

    public ItemChecklist atualizar(Long id, ItemChecklistDTO dto) {
        ItemChecklist item = buscarPorId(id);
        item.setTarefa(dto.getTarefa());
        item.setObservacao(dto.getObservacao());
        item.setOrdem(dto.getOrdem());
        return repository.save(item);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        repository.deleteById(id);
    }

    // Retorna quantos itens foram concluídos vs total
    public String progressoVisita(Long visitaId) {
        Visita visita = visitaRepository.findById(visitaId)
                .orElseThrow(() -> new RuntimeException("Visita não encontrada"));
        long concluidos = repository.countByVisitaAndConcluido(visita, true);
        long total = repository.countByVisitaAndConcluido(visita, true)
                + repository.countByVisitaAndConcluido(visita, false);
        return concluidos + "/" + total + " itens concluídos";
    }
}