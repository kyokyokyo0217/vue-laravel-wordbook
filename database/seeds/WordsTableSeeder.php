<?php
use App\Category;
use App\Word;
use Illuminate\Database\Seeder;

class WordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::all()->each(function (Category $category){
          $words = factory(Word::class, random_int(20, 30))->make();
          $category->words()->saveMany($words);
        });
    }
}
