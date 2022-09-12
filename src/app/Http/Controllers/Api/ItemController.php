<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    // postの一覧を表示する
    public function index()
    {
        $items = Item::all();
        return response()->json($items, 200);
    }
    // itemの一覧を表示する
    public function create(Request $request)
    {
        $item = new Item;
        $item->name = $request->itemName;
        $item->status = $request->itemStatus;
        $item->comment = $request->comment;
        $item->image = 'image/picture.png';
        $item->user_id = '1';
        $item->save();
        return response()->json($item, 200);
    }
}
