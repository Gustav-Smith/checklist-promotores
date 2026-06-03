package com.promotores.checklist_api.controller;

import com.promotores.checklist_api.dto.LoginDTO;
import com.promotores.checklist_api.dto.TokenDTO;
import com.promotores.checklist_api.entity.Usuario;
import com.promotores.checklist_api.repository.UsuarioRepository;
import com.promotores.checklist_api.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody @Valid LoginDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        String token = jwtService.gerarToken(usuario.getEmail());
        return ResponseEntity.ok(new TokenDTO(token, usuario.getNome(),
                usuario.getPerfil().name()));
    }
}