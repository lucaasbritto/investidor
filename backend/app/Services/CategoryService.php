<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getCategories(){
        return Category::orderBy('name')->get();
    }

    public function createCategory(array $data){
        return Category::create($data);
    }

    public function updateCategory(int $id, array $data){
        $category = Category::findOrFail($id);
        $category->update($data);
        return $category;
    }

    public function deleteCategory(int $id){
        $category = Category::findOrFail($id);
        $category->delete();
        return $category;
    }
}
