import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import {NextResponse} from 'next/server'
import * as bcrypt from 'bcrypt'

interface RequestBody {
    email : string
    username: string
    password : string
    recipesArray : object[]
}

export async function POST (req : Request) {
    const body: RequestBody = await req.json()
    await connectMongo()
    const find = await Users.findOne({email : body.email})
    if (find) {
        console.log('found');
        return NextResponse.json({msg: 'Email in use!'})
    }
    const add= await Users.create({
        email : body.email,
        username: body.username,
        password: await bcrypt.hash(body.password, 10),
        recipesArray : []
    })
    const {password, ...result} = add
    return NextResponse.json({msg : 'Signed', user: result})
}