package com.promotores.checklist_api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        // Cria a pasta se não existir
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gera nome único para o arquivo
        String extensao = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf("."));
        String nomeArquivo = UUID.randomUUID().toString() + extensao;

        // Salva o arquivo
        Path destino = uploadPath.resolve(nomeArquivo);
        Files.copy(file.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

        // Retorna a URL
        String url = "/api/uploads/" + nomeArquivo;
        return ResponseEntity.ok(Map.of("url", url));
    }

    @GetMapping("/{nomeArquivo}")
    public ResponseEntity<byte[]> buscarFoto(@PathVariable String nomeArquivo) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(nomeArquivo);
        byte[] bytes = Files.readAllBytes(filePath);

        String contentType = nomeArquivo.endsWith(".png") ? "image/png" : "image/jpeg";
        return ResponseEntity.ok()
                .header("Content-Type", contentType)
                .body(bytes);
    }
}