package com.promotores.checklist_api.controller;

import com.promotores.checklist_api.dto.IndustriaDTO;
import com.promotores.checklist_api.entity.Industria;
import com.promotores.checklist_api.service.IndustriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/industrias")
@RequiredArgsConstructor
public class IndustriaController {

    private final IndustriaService service;

    @GetMapping
    public ResponseEntity<List<Industria>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Industria> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Industria> criar(@RequestBody @Valid IndustriaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Industria> atualizar(@PathVariable Long id,
                                               @RequestBody @Valid IndustriaDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}