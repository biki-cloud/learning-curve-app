package com.example.template.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.template.entity.LearningContentEntity;
import com.example.template.entity.UserEntity;
import com.example.template.repository.LearningContentRepository;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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
            return learningContentRepository.save(content);
        }
    
        public void deleteContent(Long id) {
            learningContentRepository.deleteById(id);
        }

        public List<LearningContentEntity> getContentsByLearningCurve(UserEntity user) {
            List<LearningContentEntity> allContents = learningContentRepository.findByUser(user);
            LocalDate now = LocalDate.now();

            return allContents.stream()
                    .filter(content -> {
                        LocalDate createdDate = content.getCreatedDate();
                        long daysBetween = ChronoUnit.DAYS.between(createdDate, now);
                        // 学習曲線の条件: 例えば、作成から7日、14日、30日後に復習
                        return daysBetween == 7 || daysBetween == 14 || daysBetween == 30;
                    })
                    .collect(Collectors.toList());
        }
    
}