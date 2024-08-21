package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;
import java.util.List;

public interface LearningCurveStrategy {
    List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents);
}