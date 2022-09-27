<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class UserController extends Controller
{
    // userを作成する
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'nickname' => 'required',
            'email' => 'required',
            'password' => 'required',
            'zipcode' => 'required',
            'address' => 'required',
        ]);

        
        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ], 400);
        } else {
            // $path = $request->file('image')->store('images');
            $item = new Item;
            $item->name = $request->name;
            $item->nickname = $request->nickname;
            $item->password = $request->password;
            // $item->image = $request->file('image')->getClientOriginalName();
            $item->zipcode =  $request->zipcode;
            $item->address = $request->address;
            $item->save();
        }
    }
}
