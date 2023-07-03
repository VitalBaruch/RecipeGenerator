import { NextResponse } from "next/server";
interface RequestBody {
    
}

export async function POST (req : Request) {
    const data = ` {
        "recipes": [
          {
            "name": "Pita with Hummus",
            "ingredients": [
              {
                "name": "pita bread",
                "quantity": "1 piece"
              },
              {
                "name": "hummus",
                "quantity": "1 cup"
              }
            ],
            "instructions": [
              "Cut the pita bread in half to form pockets.",
              "Spread hummus evenly inside each pocket.",
              "Serve and enjoy!"
            ]
          }
        ]
      }`
    return NextResponse.json(data) 
}