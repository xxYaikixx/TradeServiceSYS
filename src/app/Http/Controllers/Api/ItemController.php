<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
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
        // $item->image = $request->file('image')->getClientOriginalName();
        $item->user_id =  $request->user_id;
        $item->change_item_name = $request->itemTargetName;
        $item->change_item_status = $request->itemTargetStatus;
        $item->shipping_method = $request->shippingMethod;
        $item->save();
        // 画像の保存
        // $request->file('image')->storeAs('public/' . $dir, $file_name);
        // $image = new Image();
        // $image->name = $file_name;
        // $image->path = 'storage/' . $dir . '/' . $file_name;
        // $image->save();
        return response()->json($item, 200);
    }
}
