package com.example.template.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.template.entity.LearningContentEntity;
import com.example.template.entity.UserEntity;
import com.example.template.learningCurveStrategy.LearningCurveStrategy;
import com.example.template.repository.LearningContentRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LearningContentService {
    
    @Autowired
    private LearningContentRepository learningContentRepository;
    
    public List<LearningContentEntity> getAllContents() {
        return learningContentRepository.findAll();
    }
    
    public Optional<LearningContentEntity> getContentById(Long id) {
        return learningContentRepository.findById(id);
    }
    
    public List<LearningContentEntity> getContentsByCategory(String category) {
        return learningContentRepository.findByCategory(category);
    }
    
    public List<LearningContentEntity> getContentsByUser(UserEntity user) {
        return learningContentRepository.findByUser(user);
    }
    
    public LearningContentEntity saveContent(LearningContentEntity content) {
        content.setCreatedDate(LocalDate.now());
        if (content.getNextReviewDate() == null) {
            content.setNextReviewDate(LocalDate.now());
        }
        return learningContentRepository.save(content);
    }
    
    public void deleteContent(Long id) {
        learningContentRepository.deleteById(id);
    }

    public List<LearningContentEntity> getContentsByLearningCurve(UserEntity user, String category, LearningCurveStrategy strategy) {
        List<LearningContentEntity> allContents;
        if (category == null || category.isEmpty()) {
            allContents = learningContentRepository.findByUser(user);
        } else {
            List<String> categories = List.of(category.split(","));
            allContents = learningContentRepository.findByUserAndCategoryIn(user, categories);
        }
        return allContents.isEmpty() ? allContents : strategy.filterByLearningCurve(allContents);
    }
    
    public List<String> getAllCategories() {
        return learningContentRepository.findDistinctCategories();
    }
    
}