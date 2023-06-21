import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import * as bcrypt from 'bcrypt'
import {NextResponse} from 'next/server'

interface RequestBody {
    email : string
    password : string
}

export async function POST (req : Request) {
    const body: RequestBody = await req.json()
    const {email, password} = body
    await connectMongo()
    const findUser = await Users.findOne({
        email : email
    })
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        const {password, ...userWithoutPassword} = findUser
        return NextResponse.json(userWithoutPassword)
    }
    else {
        return NextResponse.json(null)
    }
}

