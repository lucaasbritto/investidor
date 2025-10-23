<?php

namespace App\Services;

use App\Models\News;

class NewsService
{
    public function getNews(){
        return News::with('category:id,name')
            ->select('id', 'title', 'content', 'category_id', 'created_at')
            ->latest()
            ->paginate(10);
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
}
