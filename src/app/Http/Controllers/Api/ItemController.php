<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    // postの一覧を表示する
    public function index()
    {
        $items = Item::all();
        for ($n = 0; $n<count($items); $n++) {
            $items[$n]['nickname']=DB::table('users')->find($items[$n]->user_id)->nickname;
        }
        return response()->json($items, 200);
    }
    // itemの一覧を表示する
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'itemName' => 'required',
            'itemStatus' => 'required',
            'comment' => 'required',
            'itemTargetName' => 'required',
            'itemTargetStatus' => 'required',
            'shippingMethod' => 'required',
        ]);

        
        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ], 400);
        } else {
            // $path = $request->file('image')->store('images');
            $item = new Item;
            $item->name = $request->itemName;
            $item->status = $request->itemStatus;
            $item->comment = $request->comment;
            // $item->image = $request->file('image')->getClientOriginalName();
            $item->user_id =  Auth::id();
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
}
