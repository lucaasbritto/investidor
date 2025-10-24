<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\News;
use App\Models\Category;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::whereIn('name', ['Economia','Tecnologia','Esportes'])->get()->keyBy('name');

        News::insert([
            [
                'title' => 'Mercado financeiro fecha em alta nesta sexta',
                'content' => 'O índice Bovespa subiu 1,5% impulsionado por bancos e setor de energia.',
                'category_id' => $categories['Economia']->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Novo app revoluciona o transporte urbano',
                'content' => 'Aplicativo promete reduzir o tempo de espera em até 40%.',
                'category_id' => $categories['Tecnologia']->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Final do campeonato nacional será neste domingo',
                'content' => 'Equipes se preparam para a decisão com casa cheia no estádio.',
                'category_id' => $categories['Esportes']->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
