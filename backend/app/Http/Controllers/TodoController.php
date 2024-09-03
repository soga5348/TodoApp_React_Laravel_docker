<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
{
    $todos = Todo::all()->map(function ($todo) {
        return [
            '番号' => $todo->id,
            '名前' => $todo->title,
            '完了' => $todo->completed ? '済' : 'していない',
            '作成日時' => $todo->created_at,
            '更新日時' => $todo->updated_at,
        ];
    });

    return response()->json($todos, 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}


    


    public function store(Request $request)
    {
        $todo = new Todo();
        $todo->title = $request->title;
        $todo->save();

        return response()->json($todo, 201);
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
