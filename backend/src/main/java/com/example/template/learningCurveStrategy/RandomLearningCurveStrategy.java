package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RandomLearningCurveStrategy implements LearningCurveStrategy {

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        Collections.shuffle(contents);
        int limit = Math.min(contents.size(), 5); // 例えば、5件を返す
        return contents.stream().limit(limit).collect(Collectors.toList());
    }
}