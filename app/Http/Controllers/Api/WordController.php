<?php

namespace App\Http\Controllers\Api;
use App\Category;
use App\Word;
use App\Http\Controllers\Controller;
use App\Http\Resources\WordIndexResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreWord;
use App\Http\Requests\UpdateWord;


class WordController extends Controller
{
    public function index(Request $request, Category $category)
    {
      return WordIndexResource::collection(
          $category->words()->get()
      );
    }

    public function store(StoreWord $request, Category $category)
    {
      $category->words()->create([
        'name' => $request->name,
        'definition' => $request->definition,
        'memo' => $request->memo,
        'url' => $request->url,
      ]);
    }

    public function update(UpdateWord $request, Category $category, Word $word)
    {
      $word->fill($request->all())->save();
    }

    public function destroy(Request $request)
    {
        Word::destroy($request->word_id);
    }
}
