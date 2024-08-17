package com.example.template.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.template.entity.LearningContentEntity;
import com.example.template.service.LearningContentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/learning")
public class LearningContentController {

    @Autowired
    private LearningContentService learningContentService;

    @GetMapping
    public List<LearningContentEntity> getAllContents() {
        return learningContentService.getAllContents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningContentEntity> getContentById(@PathVariable Long id) {
        Optional<LearningContentEntity> content = learningContentService.getContentById(id);
        return content.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<LearningContentEntity> createContent(@RequestBody LearningContentEntity content) {
        LearningContentEntity savedContent = learningContentService.saveContent(content);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        learningContentService.deleteContent(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
