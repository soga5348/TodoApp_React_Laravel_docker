<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TodoController extends Controller
{
    public function index()
{
    $todos = Todo::all()->map(function ($todo) {
        return [
            '番号' => $todo->id,
            '名前' => $todo->title,
            '完了' => $todo->completed ? '済' : 'していない',
            '作成日時' => Carbon::parse($todo->created_at)->timezone('Asia/Tokyo')->toDateTimeString(),
            '更新日時' => Carbon::parse($todo->updated_at)->timezone('Asia/Tokyo')->toDateTimeString(),
        ];
    });

    return response()->json($todos, 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}


    


public function store(Request $request)
{
    // バリデーションを追加
    $request->validate([
        '名前' => 'required|string|max:255',
    ]);

    $todo = new Todo();
    $todo->title = $request->input('名前');  // 'title' ではなく '名前' を受け取る
    $todo->save();

    return response()->json($todo, 201, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}


    public function update(Request $request, Todo $todo)
    {
        $todo->completed = $request->completed;
        $todo->save();

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json(null, 204);
    }
}
