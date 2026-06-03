package com.promotores.checklist_api.service;

import com.promotores.checklist_api.dto.SupermercadoDTO;
import com.promotores.checklist_api.entity.Supermercado;
import com.promotores.checklist_api.repository.SupermercadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SupermercadoService {

    private final SupermercadoRepository repository;

    public List<Supermercado> listarTodos() {
        return repository.findAll();
    }

    public List<Supermercado> listarPorEstado(String estado) {
        return repository.findByEstado(estado.toUpperCase());
    }

    public Supermercado buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supermercado não encontrado"));
    }

    public Supermercado criar(SupermercadoDTO dto) {
        if (repository.existsByNomeAndEndereco(dto.getNome(), dto.getEndereco())) {
            throw new RuntimeException("Supermercado já cadastrado neste endereço");
        }
        Supermercado s = new Supermercado();
        s.setNome(dto.getNome());
        s.setEndereco(dto.getEndereco());
        s.setCidade(dto.getCidade());
        s.setEstado(dto.getEstado().toUpperCase());
        s.setAtivo(true);
        return repository.save(s);
    }

    public Supermercado atualizar(Long id, SupermercadoDTO dto) {
        Supermercado s = buscarPorId(id);
        s.setNome(dto.getNome());
        s.setEndereco(dto.getEndereco());
        s.setCidade(dto.getCidade());
        s.setEstado(dto.getEstado().toUpperCase());
        return repository.save(s);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}