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
}
