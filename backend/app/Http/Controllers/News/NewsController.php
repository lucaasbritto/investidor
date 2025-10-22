<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\NewsResource;
use App\Services\NewsService;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService){
        $this->newsService = $newsService;
    }

    public function index(){
        $news = $this->newsService->getNews();
        
        return NewsResource::collection($news);
    }
    
}
