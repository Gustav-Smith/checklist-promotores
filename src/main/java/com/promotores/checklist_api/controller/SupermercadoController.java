package com.promotores.checklist_api.controller;

import com.promotores.checklist_api.dto.SupermercadoDTO;
import com.promotores.checklist_api.entity.Supermercado;
import com.promotores.checklist_api.service.SupermercadoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/supermercados")
@RequiredArgsConstructor
public class SupermercadoController {

    private final SupermercadoService service;

    @GetMapping
    public ResponseEntity<List<Supermercado>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Supermercado>> listarPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(service.listarPorEstado(estado));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supermercado> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Supermercado> criar(@RequestBody @Valid SupermercadoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supermercado> atualizar(@PathVariable Long id,
                                                  @RequestBody @Valid SupermercadoDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}