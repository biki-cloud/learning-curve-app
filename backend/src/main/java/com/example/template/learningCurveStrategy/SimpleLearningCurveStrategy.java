package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Primary
public class SimpleLearningCurveStrategy implements LearningCurveStrategy {

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        LocalDate now = LocalDate.now();
        return contents.stream()
                .peek(content -> content.setLevel(calculateLevel(content, now)))
                .sorted((c1, c2) -> Integer.compare(c1.getLevel(), c2.getLevel()))
                .collect(Collectors.toList());
    }

    private int calculateLevel(LearningContentEntity content, LocalDate today) {
        double timeWeight = calculateTimeWeight(content.getLastReviewedDate(), today);
        double baseLevel = content.getReviewCount();
        double finalLevel = baseLevel * timeWeight;
        return (int) Math.min(Math.max(finalLevel, 0), 10);
    }

    private double calculateTimeWeight(LocalDate lastReviewedDate, LocalDate today) {
        if (lastReviewedDate == null) {
            return 10;
        }
        long daysSinceLastReview = ChronoUnit.DAYS.between(lastReviewedDate, today);
        return Math.min(daysSinceLastReview, 10);
    }
}