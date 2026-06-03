package com.promotores.checklist_api.dto;

import lombok.Data;

@Data
public class TokenDTO {
    private String token;
    private String tipo = "Bearer";
    private String nome;
    private String perfil;

    public TokenDTO(String token, String nome, String perfil) {
        this.token = token;
        this.nome = nome;
        this.perfil = perfil;
    }
}