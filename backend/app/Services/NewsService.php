<?php

namespace App\Services;

use App\Models\News;

class NewsService
{
    public function getNews(array $filters = []){
        $query = News::with('category:id,name')
            ->select('id', 'title', 'content', 'category_id', 'created_at');
        
        if (!empty($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        return $query->latest()->paginate(10);
    }

    public function createNews(array $data){
        return News::create($data);
    }

    public function updateNews($id, array $data){
        $news = News::findOrFail($id);

        if (!$news) {
            throw new \Exception('Notícia não encontrada');
        }

        $news->update($data);

        return $news;
    }

    public function deleteNews($id){
        $news = News::findOrFail($id);
        $news->delete();
        return $news;
    }
}
