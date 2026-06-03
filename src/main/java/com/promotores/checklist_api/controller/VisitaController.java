package com.promotores.checklist_api.controller;

import com.promotores.checklist_api.dto.VisitaDTO;
import com.promotores.checklist_api.entity.Visita;
import com.promotores.checklist_api.service.VisitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/visitas")
@RequiredArgsConstructor
public class VisitaController {

    private final VisitaService service;

    @GetMapping
    public ResponseEntity<List<Visita>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/promotor/{promotorId}")
    public ResponseEntity<List<Visita>> listarPorPromotor(@PathVariable Long promotorId) {
        return ResponseEntity.ok(service.listarPorPromotor(promotorId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Visita>> listarPorStatus(@PathVariable Visita.Status status) {
        return ResponseEntity.ok(service.listarPorStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visita> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Visita> criar(@RequestBody @Valid VisitaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}/iniciar")
    public ResponseEntity<Visita> iniciar(@PathVariable Long id) {
        return ResponseEntity.ok(service.iniciarVisita(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<Visita> finalizar(@PathVariable Long id) {
        return ResponseEntity.ok(service.finalizarVisita(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visita> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid VisitaDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}