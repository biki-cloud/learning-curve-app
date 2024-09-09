package com.example.template.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ファイルが空です");
        }

        try {
            // 保存先のパスを作成
            Path path = Paths.get(uploadDir + File.separator + file.getOriginalFilename());
            Files.createDirectories(path.getParent()); // ディレクトリが存在しない場合は作成
            Files.write(path, file.getBytes()); // ファイルを保存

            // アクセス可能なURLを返す
            String fileUrl = "/api/files/" + file.getOriginalFilename();
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ファイルのアップロードに失敗しました");
        }
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir + File.separator + filename);
            byte[] data = Files.readAllBytes(filePath);
            return ResponseEntity.ok(data);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}