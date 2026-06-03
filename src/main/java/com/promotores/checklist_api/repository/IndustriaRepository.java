package com.promotores.checklist_api.repository;

import com.promotores.checklist_api.entity.Industria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndustriaRepository extends JpaRepository<Industria, Long> {
    // JpaRepository já nos dá: findAll, findById, save, deleteById...
    boolean existsByNome(String nome);
}