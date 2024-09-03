<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::all(), 200, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
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
