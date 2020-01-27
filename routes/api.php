<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/user', function(){return Auth::user();})->name('user');
Route::get('/reflesh-token', function (Request $request) {
    $request->session()->regenerateToken();
    return response()->json();
});


Route::apiResource('categories', 'Api\CategoryController')->except('show');
Route::apiResource('categories/{category}/words', 'Api\WordController')->except('show');
