package com.promotores.checklist_api.repository;

import com.promotores.checklist_api.entity.ItemChecklist;
import com.promotores.checklist_api.entity.Visita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemChecklistRepository extends JpaRepository<ItemChecklist, Long> {
    List<ItemChecklist> findByVisitaOrderByOrdem(Visita visita);
    long countByVisitaAndConcluido(Visita visita, Boolean concluido);
}