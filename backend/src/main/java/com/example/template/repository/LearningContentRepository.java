package com.example.template.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.template.entity.LearningContentEntity;

@Repository
public interface LearningContentRepository extends JpaRepository<LearningContentEntity, Long> {

    // カテゴリーでフィルタリングするためのカスタムクエリメソッド
    List<LearningContentEntity> findByCategory(String category);
}
