package com.promotores.checklist_api.dto;

import com.promotores.checklist_api.entity.Visita;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class VisitaDTO {
    private Long id;

    @NotNull(message = "Promotor é obrigatório")
    private Long promotorId;

    @NotNull(message = "Supermercado é obrigatório")
    private Long supermercadoId;

    @NotNull(message = "Indústria é obrigatória")
    private Long industriaId;

    @NotNull(message = "Data é obrigatória")
    private LocalDate dataVisita;

    private Visita.Status status;
    private String observacaoGeral;
}