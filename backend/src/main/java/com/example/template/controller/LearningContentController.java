package com.example.template.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.template.entity.LearningContentEntity;
import com.example.template.entity.UserEntity;
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

    @GetMapping("/user/{userId}")
    public List<LearningContentEntity> getContentsByUser(@PathVariable Long userId) {
        UserEntity user = new UserEntity();
        user.setId(userId);
        return learningContentService.getContentsByUser(user);
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

    @PutMapping("/{id}")
    public ResponseEntity<LearningContentEntity> updateLearningContent(
            @PathVariable Long id, @RequestBody LearningContentEntity newContent) {
        Optional<LearningContentEntity> optionalContent = learningContentService.getContentById(id);

        if (optionalContent.isPresent()) {
            LearningContentEntity existingContent = optionalContent.get();
            existingContent.setTitle(newContent.getTitle());
            existingContent.setContent(newContent.getContent());
            existingContent.setCategory(newContent.getCategory());
            existingContent.setUser(newContent.getUser());
            learningContentService.saveContent(existingContent);
            return ResponseEntity.ok(existingContent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}