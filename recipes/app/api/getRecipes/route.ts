import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import {NextResponse} from 'next/server'
import S3 from 'aws-sdk/clients/s3'
import dotenv from 'dotenv'
import { recipeReturn, recipeSend } from "@/utils/types"

interface RequestBody {
    userEmail : string
}

export async function POST (req : Request) {
    dotenv.config()
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const s3 = new S3({
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!
        }, 
        region
    })


    const body: RequestBody = await req.json()

    const getFile = (recipeName : string) => {
        const res = s3.getObject({
            Bucket : bucketName!,
            Key: recipeName
        })
        return res.promise()
    }

    const {userEmail} = body
    console.log(userEmail);
    await connectMongo()
    const user = await Users.findOne({email : userEmail})
    const returnArray = []
    if (!user) NextResponse.json({recipes : []})
    const recipesArray : Array<recipeSend> = user.recipesArray;
    for (const recipe of recipesArray) {
        const base64Image = (await getFile(recipe.name)).Body?.toString()!
        returnArray.push({
            base64Image: base64Image,
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        })
    }   
    return NextResponse.json({recipes : returnArray}) 
}
