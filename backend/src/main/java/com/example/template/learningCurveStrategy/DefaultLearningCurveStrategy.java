package com.example.template.learningCurveStrategy;

import com.example.template.entity.LearningContentEntity;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Component
public class DefaultLearningCurveStrategy implements LearningCurveStrategy {

    private static final Logger logger = LogManager.getLogger(DefaultLearningCurveStrategy.class);

    @Override
    public List<LearningContentEntity> filterByLearningCurve(List<LearningContentEntity> contents) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Tokyo"));
        logger.info("Filtering contents for date: {}", today);
        logger.info("Total contents before filtering: {}", contents.size());

        contents.forEach(content -> 
            logger.debug("Content ID: {}, Level: {}, NextReviewDate: {}", content.getId(), content.getLevel(), content.getNextReviewDate())
        );

        List<LearningContentEntity> filteredContents = contents.stream()
                .filter(content -> content.getNextReviewDate() != null && 
                                   (content.getNextReviewDate().isBefore(today) || content.getNextReviewDate().isEqual(today)))
                .sorted(Comparator.comparingInt(LearningContentEntity::getLevel)
                                  .thenComparingInt(LearningContentEntity::getCorrectCount))
                .collect(Collectors.toList());

        logger.info("Total contents after filtering: {}", filteredContents.size());

        filteredContents.forEach(content -> 
            logger.debug("Filtered Content ID: {}, Level: {}, NextReviewDate: {}", content.getId(), content.getLevel(), content.getNextReviewDate())
        );

        return filteredContents;
    }
}