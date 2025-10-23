<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService){
        $this->categoryService = $categoryService;
    }

    public function index(){
        $categories = $this->categoryService->getCategories();
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request){
        $category = $this->categoryService->createCategory($request->validated());
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, $id){
        $category = $this->categoryService->updateCategory($id, $request->validated());
        return new CategoryResource($category);
    }

    public function destroy($id){
        $category = $this->categoryService->deleteCategory($id);
        return response()->json([
            'message' => 'Categoria excluída com sucesso!',
            'data' => new CategoryResource($category)
        ], 200);
    }
}
