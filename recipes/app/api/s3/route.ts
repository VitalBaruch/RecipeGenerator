import S3 from 'aws-sdk/clients/s3'
import dotenv from 'dotenv'
import { NextResponse } from 'next/server'

export async function POST(req : Request) {
    dotenv.config()
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const {recipeName} = await req.json()


    const s3 = new S3({
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!
        }, 
        region
    })
    
    const getFile = () => {
        const getParams = {
            Bucket: bucketName!,
            Key: recipeName  
        }
        return s3.getObject(getParams).promise()
    }

    const image = await getFile()

    return NextResponse.json(image.Body)
}