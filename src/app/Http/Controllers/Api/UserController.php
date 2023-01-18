<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // userを作成する
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'nickname' => 'required',
            'email' => 'required|email',
            'password2' => 'required|same:password',
            'zipcode' => 'required',
            'address' => 'required',
            'address2' => 'required',
        ]);

        
        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ], 400);
        } else {
            // $path = $request->file('image')->store('images');
            $user = new User;
            $user->name = $request->name;
            $user->nickname = $request->nickname;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->zipcode =  $request->zipcode;
            $user->address = $request->address;
            $user->email_verified_at = Carbon::now();
            $user->save();
        }
    }
}
