import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import {NextResponse} from 'next/server'
import S3 from 'aws-sdk/clients/s3'
import dotenv from 'dotenv'
import { ingredient, recipe, user } from "@/utils/types" 

interface RequestBody {
    name : string,
    ingredients : ingredient[],
    instructions : string[],
    userEmail : string,
    base64Image : string
}

export async function POST (req : Request) {
    dotenv.config()
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const body: RequestBody = await req.json()
    const {userEmail, base64Image, ...recipe} = body

    const s3 = new S3({
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!
        }, 
        region
    })

    const uploadFile = () => {
        const uploadParams = {
            Bucket: bucketName!,
            Body: base64Image,
            Key: recipe.name
        }    
        return s3.upload(uploadParams).promise()
    }

    await connectMongo()
    const user = await Users.findOne({email : userEmail})
    if (user) {
        if (user.recipesArray.find(((rec : recipe) => rec.name = recipe.name))) {
            return NextResponse.json({msg : 'exist'})
        }
        const response = await uploadFile();
        console.log(response);
        user.recipesArray = [...user.recipesArray, recipe]
        user.save()
        return NextResponse.json({msg : 'saved'})
    } else {
        return NextResponse.json({msg : 'error'})
    }
}