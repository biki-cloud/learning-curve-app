package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class DefaultLearningCurveStrategy implements LearningCurveStrategy {

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        LocalDate today = LocalDate.now();
        return contents.stream()
                .filter(content -> content.getNextReviewDate() != null && !content.getNextReviewDate().isAfter(today))
                .collect(Collectors.toList());
    }
    
}