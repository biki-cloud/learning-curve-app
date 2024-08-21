package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SimpleLearningCurveStrategy implements LearningCurveStrategy {

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        LocalDate now = LocalDate.now();
        return contents.stream()
                .filter(content -> {
                    LocalDate createdDate = content.getCreatedDate();
                    long daysBetween = ChronoUnit.DAYS.between(createdDate, now);
                    // 学習曲線の条件: 例えば、作成から7日、14日、30日後に復習
                    return daysBetween == 7 || daysBetween == 14 || daysBetween == 30;
                })
                .collect(Collectors.toList());
    }
}