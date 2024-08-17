package com.example.template.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.template.entity.LearningContentEntity;
import com.example.template.repository.LearningContentRepository;

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
    
        public LearningContentEntity saveContent(LearningContentEntity content) {
            return learningContentRepository.save(content);
        }
    
        public void deleteContent(Long id) {
            learningContentRepository.deleteById(id);
        }

}
