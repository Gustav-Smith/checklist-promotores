package com.promotores.checklist_api.repository;

import com.promotores.checklist_api.entity.Visita;
import com.promotores.checklist_api.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface VisitaRepository extends JpaRepository<Visita, Long> {
    List<Visita> findByPromotor(Usuario promotor);
    List<Visita> findByDataVisita(LocalDate data);
    List<Visita> findByStatus(Visita.Status status);
    List<Visita> findByPromotorAndDataVisita(Usuario promotor, LocalDate data);
}