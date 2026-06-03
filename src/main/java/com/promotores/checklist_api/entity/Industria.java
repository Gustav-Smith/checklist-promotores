package com.promotores.checklist_api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "industrias")
public class Industria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 200)
    private String descricao;

    @Column(nullable = false)
    private Boolean ativa = true;
}