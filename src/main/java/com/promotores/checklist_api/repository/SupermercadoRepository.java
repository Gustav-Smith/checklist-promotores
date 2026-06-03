package com.promotores.checklist_api.repository;

import com.promotores.checklist_api.entity.Supermercado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupermercadoRepository extends JpaRepository<Supermercado, Long> {
    List<Supermercado> findByEstado(String estado);
    boolean existsByNomeAndEndereco(String nome, String endereco);
}