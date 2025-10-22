<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{    
    public function toArray(Request $request): array
    {
       return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
