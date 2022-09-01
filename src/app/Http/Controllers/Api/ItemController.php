<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    // postの一覧を表示する
    public function index()
    {
        $items = Item::all();
        return response()->json($items, 200);
    }
}
