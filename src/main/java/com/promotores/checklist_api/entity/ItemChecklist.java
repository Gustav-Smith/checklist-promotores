package com.promotores.checklist_api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "itens_checklist")
public class ItemChecklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Visita visita;

    @Column(nullable = false, length = 200)
    private String tarefa;           // ex: "Verificar ruptura de estoque"

    @Column(nullable = false)
    private Boolean concluido = false;

    @Column(length = 500)
    private String observacao;

    @Column(length = 500)
    private String urlFoto;          // caminho da foto tirada pelo promotor

    private Integer ordem;           // ordem de exibição no checklist
}