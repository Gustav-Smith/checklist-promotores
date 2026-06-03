package com.promotores.checklist_api.controller;

import com.promotores.checklist_api.dto.ItemChecklistDTO;
import com.promotores.checklist_api.entity.ItemChecklist;
import com.promotores.checklist_api.service.ItemChecklistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/itens-checklist")
@RequiredArgsConstructor
public class ItemChecklistController {

    private final ItemChecklistService service;

    @GetMapping("/visita/{visitaId}")
    public ResponseEntity<List<ItemChecklist>> listarPorVisita(@PathVariable Long visitaId) {
        return ResponseEntity.ok(service.listarPorVisita(visitaId));
    }

    @GetMapping("/visita/{visitaId}/progresso")
    public ResponseEntity<String> progresso(@PathVariable Long visitaId) {
        return ResponseEntity.ok(service.progressoVisita(visitaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemChecklist> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ItemChecklist> criar(@RequestBody @Valid ItemChecklistDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<ItemChecklist> concluir(@PathVariable Long id,
                                                  @RequestParam(required = false) String observacao) {
        return ResponseEntity.ok(service.marcarConcluido(id, observacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemChecklist> atualizar(@PathVariable Long id,
                                                   @RequestBody @Valid ItemChecklistDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}