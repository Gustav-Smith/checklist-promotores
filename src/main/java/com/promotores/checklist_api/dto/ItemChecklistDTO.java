package com.promotores.checklist_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemChecklistDTO {

    private Long id;

    @NotNull(message = "Visita é obrigatória")
    private Long visitaId;

    @NotBlank(message = "Tarefa é obrigatória")
    private String tarefa;

    private Boolean concluido = false;
    private String observacao;
    private String urlFoto;
    private Integer ordem;
}