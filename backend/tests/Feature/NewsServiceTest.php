<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\Category;
use App\Services\NewsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsServiceTest extends TestCase
{
    use RefreshDatabase;

    protected NewsService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new NewsService();
    }

    public function test_it_returns_paginated_news()
    {
        News::factory()->count(15)->create();

        $result = $this->service->getNews();
        
        $this->assertEquals(6, $result->perPage());
        $this->assertEquals(1, $result->currentPage());
        $this->assertCount(6, $result->items());
    }

    public function test_it_filters_by_title()
    {
        $news1 = News::factory()->create(['title' => 'PHP é top']);
        $news2 = News::factory()->create(['title' => 'JavaScript também']);

        $result = $this->service->getNews(['title' => 'PHP']);
        
        $this->assertCount(1, $result->items());
        $this->assertEquals($news1->id, $result->items()[0]->id);
    }

    public function test_it_creates_news()
    {
        $category = Category::factory()->create();

        $news = $this->service->createNews([
            'title' => 'Nova Notícia',
            'content' => 'Conteúdo da notícia',
            'category_id' => $category->id,
        ]);

        $this->assertDatabaseHas('news', ['id' => $news->id, 'title' => 'Nova Notícia']);
    }

    public function test_it_updates_news()
    {
        $news = News::factory()->create(['title' => 'Título antigo']);

        $updated = $this->service->updateNews($news->id, ['title' => 'Título novo']);

        $this->assertEquals('Título novo', $updated->title);
        $this->assertDatabaseHas('news', ['id' => $news->id, 'title' => 'Título novo']);
    }

    public function test_it_deletes_news()
    {
        $news = News::factory()->create();

        $this->service->deleteNews($news->id);

        $this->assertSoftDeleted('news', ['id' => $news->id]);
    }
}
