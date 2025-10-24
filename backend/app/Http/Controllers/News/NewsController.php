<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\NewsResource;
use App\Services\NewsService;
use App\Http\Requests\NewsRequest;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService){
        $this->newsService = $newsService;
    }

    public function index(Request $request){
        $filters = [
            'title'       => $request->query('title'),
            'category_id' => $request->query('category_id')
        ];

        $news = $this->newsService->getNews($filters);
        
        return NewsResource::collection($news);
    }

    public function store(NewsRequest $request){
        $news = $this->newsService->createNews($request->validated());
        return new NewsResource($news);
    }

    public function update(NewsRequest $request, $id){
        $news = $this->newsService->updateNews($id, $request->validated());
        return new NewsResource($news);
    }

    public function destroy($id){
    $news = $this->newsService->deleteNews($id);
    return response()->json([
        'message' => 'Notícia excluída com sucesso!',
        'data' => new NewsResource($news)
    ], 200);
}
    
}
