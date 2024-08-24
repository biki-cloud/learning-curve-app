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
                '}';
    }
}