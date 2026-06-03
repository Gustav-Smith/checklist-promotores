package com.promotores.checklist_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data                          // Lombok: gera getters, setters, toString
@Entity                        // JPA: essa classe vira uma tabela
@Table(name = "usuarios")      // nome da tabela no banco
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto incremento
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Perfil perfil;   // ADMIN, COORDENADOR, PROMOTOR

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    public enum Perfil {
        ADMIN, COORDENADOR, PROMOTOR
    }
}