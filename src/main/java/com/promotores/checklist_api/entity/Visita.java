package com.promotores.checklist_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "visitas")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne                          // muitas visitas → um promotor
    @JoinColumn(nullable = false)
    private Usuario promotor;

    @ManyToOne                          // muitas visitas → um supermercado
    @JoinColumn(nullable = false)
    private Supermercado supermercado;

    @ManyToOne                          // muitas visitas → uma indústria
    @JoinColumn(nullable = false)
    private Industria industria;

    @Column(nullable = false)
    private LocalDate dataVisita;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDENTE;

    private LocalDateTime iniciadaEm;
    private LocalDateTime finalizadaEm;

    @Column(length = 500)
    private String observacaoGeral;

    @Column(updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    public enum Status {
        PENDENTE, EM_ANDAMENTO, CONCLUIDA, CANCELADA
    }
}