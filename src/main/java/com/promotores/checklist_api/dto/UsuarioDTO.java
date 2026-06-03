package com.promotores.checklist_api.dto;

import com.promotores.checklist_api.entity.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @Email(message = "E-mail inválido")
    @NotBlank(message = "E-mail é obrigatório")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    @NotNull(message = "Perfil é obrigatório")
    private Usuario.Perfil perfil;

    private Boolean ativo;
}