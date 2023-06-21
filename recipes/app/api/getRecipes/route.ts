import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import {NextResponse} from 'next/server'

interface RequestBody {
    userEmail : string
}

export async function POST (req : Request) {
    const body: RequestBody = await req.json()
    console.log(body);
    const {userEmail} = body
    console.log(userEmail);
    await connectMongo()
    const user = await Users.findOne({email : userEmail})
    if (user) {
        return NextResponse.json({recipes : user.recipesArray})
    } else {
        return NextResponse.json(null)
    }
}