package com.promotores.checklist_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IndustriaDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;
    private Boolean ativa;
}