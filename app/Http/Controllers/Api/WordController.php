<?php

namespace App\Http\Controllers\Api;
use App\Category;
use App\Word;
use App\Http\Controllers\Controller;
use App\Http\Resources\WordIndexResource;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function index($id, Request $request)
    {
      $category = Category::findOrFail($id);

      return WordIndexResource::collection(
          $category->words()->get()
      );
    }

    public function store(Request $request)
    {
      $category = Category::findOrFail($request->categoryId);

      $category->words()->create([
        'id' => $request->id,
        'name' => $request->name,
        'definition' => $request->definition,
        'memo' => $request->memo,
        'url' => $request->url,
      ]);
    }

    public function update(Request $request)
    {
      // 1. validation(Requestつくる)
      // 2. $word = Word::findOrFail($request->id);
      $word = Word::findOrFail($request->id);
      // 3. $word->fill()->save();
      $word->fill($request->all())->save();
      // 4. resourceクラス返却, jsonに -> 要る？
    }

    public function destroy(Request $request)
    {
        Word::destroy($request->word_id);
    }
}
