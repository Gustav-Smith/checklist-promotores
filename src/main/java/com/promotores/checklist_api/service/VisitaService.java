package com.promotores.checklist_api.service;

import com.promotores.checklist_api.dto.VisitaDTO;
import com.promotores.checklist_api.entity.*;
import com.promotores.checklist_api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitaService {

    private final VisitaRepository visitaRepository;
    private final UsuarioRepository usuarioRepository;
    private final SupermercadoRepository supermercadoRepository;
    private final IndustriaRepository industriaRepository;

    public List<Visita> listarTodas() {
        return visitaRepository.findAll();
    }

    public List<Visita> listarPorPromotor(Long promotorId) {
        Usuario promotor = usuarioRepository.findById(promotorId)
                .orElseThrow(() -> new RuntimeException("Promotor não encontrado"));
        return visitaRepository.findByPromotor(promotor);
    }

    public List<Visita> listarPorStatus(Visita.Status status) {
        return visitaRepository.findByStatus(status);
    }

    public Visita buscarPorId(Long id) {
        return visitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visita não encontrada"));
    }

    public Visita criar(VisitaDTO dto) {
        Usuario promotor = usuarioRepository.findById(dto.getPromotorId())
                .orElseThrow(() -> new RuntimeException("Promotor não encontrado"));
        Supermercado supermercado = supermercadoRepository.findById(dto.getSupermercadoId())
                .orElseThrow(() -> new RuntimeException("Supermercado não encontrado"));
        Industria industria = industriaRepository.findById(dto.getIndustriaId())
                .orElseThrow(() -> new RuntimeException("Indústria não encontrada"));

        Visita visita = new Visita();
        visita.setPromotor(promotor);
        visita.setSupermercado(supermercado);
        visita.setIndustria(industria);
        visita.setDataVisita(dto.getDataVisita());
        visita.setStatus(Visita.Status.PENDENTE);
        visita.setObservacaoGeral(dto.getObservacaoGeral());

        return visitaRepository.save(visita);
    }

    public Visita iniciarVisita(Long id) {
        Visita visita = buscarPorId(id);
        if (visita.getStatus() != Visita.Status.PENDENTE) {
            throw new RuntimeException("Só é possível iniciar visitas com status PENDENTE");
        }
        visita.setStatus(Visita.Status.EM_ANDAMENTO);
        visita.setIniciadaEm(LocalDateTime.now());
        return visitaRepository.save(visita);
    }

    public Visita finalizarVisita(Long id) {
        Visita visita = buscarPorId(id);
        if (visita.getStatus() != Visita.Status.EM_ANDAMENTO) {
            throw new RuntimeException("Só é possível finalizar visitas em andamento");
        }
        visita.setStatus(Visita.Status.CONCLUIDA);
        visita.setFinalizadaEm(LocalDateTime.now());
        return visitaRepository.save(visita);
    }

    public Visita atualizar(Long id, VisitaDTO dto) {
        Visita visita = buscarPorId(id);
        visita.setDataVisita(dto.getDataVisita());
        visita.setObservacaoGeral(dto.getObservacaoGeral());
        return visitaRepository.save(visita);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        visitaRepository.deleteById(id);
    }
}