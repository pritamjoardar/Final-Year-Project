import { NextRequest,NextResponse } from "next/server";
import Razorpay from 'razorpay';

export async function POST(request:NextRequest){
    const Data = await request.json();
    const {amount} = Data;
   
    let razorpay = new Razorpay({
        key_id: "",
        key_secret:""
    })

    try {
        var ordercreate = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
        })
        console.log(amount)
    } catch (error) {
       return NextResponse.json(error);
    }
      return NextResponse.json(amount);
    
}
