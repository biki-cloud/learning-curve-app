package com.example.template.controller;

import com.example.template.service.AwsStorageService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private AwsStorageService awsStorageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String s3Path = "uploads/" + file.getOriginalFilename(); // S3のパスを指定
            awsStorageService.uploadFile(s3Path, file);
            return ResponseEntity.ok("File uploaded successfully: " + s3Path);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }
}