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
    
    @Autowired
    private LearningCurveStrategy learningCurveStrategy;
    
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
        return learningContentRepository.save(content);
    }
    
    public void deleteContent(Long id) {
        learningContentRepository.deleteById(id);
    }

    public List<LearningContentEntity> getContentsByLearningCurve(UserEntity user) {
        List<LearningContentEntity> allContents = learningContentRepository.findByUser(user);
        return learningCurveStrategy.filterByLearningCurve(allContents);
    }
    
    public List<String> getAllCategories() {
        return learningContentRepository.findDistinctCategories();
    }
    
}