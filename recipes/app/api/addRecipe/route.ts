import connectMongo from "@/utils/connect"
import Users from "@/models/userModel"
import {NextResponse} from 'next/server'
import S3 from 'aws-sdk/clients/s3'
import dotenv from 'dotenv'

interface ingredient {
    name : string,
    quantity: string
}

interface RequestBody {
    name : string,
    ingredients : ingredient[],
    instructions : string[],
    pictureUrl : string,
    userEmail : string
}

export async function POST (req : Request) {
    dotenv.config()
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const body: RequestBody = await req.json()
    const {userEmail, ...recipe} = body

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
            Body: recipe.pictureUrl,
            Key: recipe.name
        }    
        return s3.upload(uploadParams).promise()
    }

    const response = await uploadFile();
    console.log(response);

    await connectMongo()
    const user = await Users.findOne({email : userEmail})
    if (user) {
        user.recipesArray = [...user.recipesArray, recipe]
        user.save()
        return NextResponse.json({msg : 'saved'})
    } else {
        return NextResponse.json({msg : 'error'})
    }
}