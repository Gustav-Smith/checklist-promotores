package com.promotores.checklist_api.service;

import com.promotores.checklist_api.dto.UsuarioDTO;
import com.promotores.checklist_api.entity.Usuario;
import com.promotores.checklist_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;  // encripta a senha

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public List<Usuario> listarPorPerfil(Usuario.Perfil perfil) {
        return repository.findByPerfil(perfil);
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario criar(UsuarioDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        Usuario u = new Usuario();
        u.setNome(dto.getNome());
        u.setEmail(dto.getEmail());
        u.setSenha(passwordEncoder.encode(dto.getSenha()));  // nunca salva senha pura!
        u.setPerfil(dto.getPerfil());
        u.setAtivo(true);
        return repository.save(u);
    }

    public Usuario atualizar(Long id, UsuarioDTO dto) {
        Usuario u = buscarPorId(id);
        u.setNome(dto.getNome());
        u.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            u.setSenha(passwordEncoder.encode(dto.getSenha()));
        }
        return repository.save(u);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        repository.deleteById(id);
    }
}