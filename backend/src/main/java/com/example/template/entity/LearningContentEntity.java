package com.example.template.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;

@Entity
@Table(name = "learning_content")
@Data
public class LearningContentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = true)
    private LocalDate createdDate;

    @Column(nullable = true)
    private LocalDate lastReviewedDate;

    @Column(nullable = false)
    private int reviewCount = 0;

    @Column(nullable = false)
    private int correctCount = 0; // Correct count

    @Column(nullable = false)
    private int incorrectCount = 0; // Incorrect count

    @Column(nullable = false)
    private int level = 1; // Level

    @Column(nullable = true)
    private LocalDate nextReviewDate; // Next review date

    @Column(nullable = true)
    private boolean isDraft = false;

    // Method to handle correct answer
    public void correctAnswer() {
        correctCount++;
        reviewCount++;
        level = Math.min(level + 1, 3); // Increase level (max 3)
        lastReviewedDate = LocalDate.now();
        nextReviewDate = calculateNextReviewDate();
    }

    // Method to handle incorrect answer
    public void incorrectAnswer() {
        incorrectCount++;
        reviewCount++;
        level = Math.max(level - 1, 1); // Decrease level (min 1)
        lastReviewedDate = LocalDate.now();
        nextReviewDate = calculateNextReviewDate();
    }

    // Method to calculate next review date
    private LocalDate calculateNextReviewDate() {
        switch (level) {
            case 1:
                return LocalDate.now().plusDays(1); // Next day
            case 2:
                return LocalDate.now().plusDays(3); // 3 days later
            case 3:
                return LocalDate.now().plusWeeks(1); // 1 week later
            default:
                return null;
        }
    }

    @Override
    public String toString() {
        return "LearningContentEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", category='" + category + '\'' +
                ", user=" + user +
                ", createdDate=" + createdDate +
                ", lastReviewedDate=" + lastReviewedDate +
                ", reviewCount=" + reviewCount +
                ", correctCount=" + correctCount +
                ", incorrectCount=" + incorrectCount +
                ", level=" + level +
                ", nextReviewDate=" + nextReviewDate +
                '}';
    }
}