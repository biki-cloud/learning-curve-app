package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Primary
public class GetFewReviewCountLearningStrategy implements LearningCurveStrategy {

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        return contents.stream()
                .sorted(Comparator.comparingInt(LearningContentEntity::getReviewCount))
                .limit(5) // 例えば、5件を返す
                .collect(Collectors.toList());
    }
}