package com.example.template.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.template.entity.LearningContentEntity;
import com.example.template.entity.UserEntity;

@Repository
public interface LearningContentRepository extends JpaRepository<LearningContentEntity, Long> {

    // カテゴリーでフィルタリングするためのカスタムクエリメソッド
    List<LearningContentEntity> findByCategory(String category);

    // ユーザーごとのコンテンツを取得するためのカスタムクエリメソッド
    List<LearningContentEntity> findByUser(UserEntity user);

    // ユーザーとカテゴリでフィルタリングするためのカスタムクエリメソッド
    List<LearningContentEntity> findByUserAndCategory(UserEntity user, String category);

    // カテゴリの一覧を取得するためのカスタムクエリメソッド
    @Query("SELECT DISTINCT category FROM LearningContentEntity")
    List<String> findDistinctCategories();

    // ユーザーと複数のカテゴリでフィルタリングするためのカスタムクエリメソッド
    List<LearningContentEntity> findByUserAndCategoryIn(UserEntity user, List<String> categories);

    // 全てのコンテンツを取得するためのメソッド
    List<LearningContentEntity> findAll();

    // ドラフトを取得するためのカスタムクエリメソッド
    List<LearningContentEntity> findByUserAndIsDraft(UserEntity user, boolean isDraft);
}