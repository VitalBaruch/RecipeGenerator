export const getImageFromGPT = async (prompt : string) => {
    const response = await fetch('/api/gpt/generateImage', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({prompt})
    })
    const data = await response.json()
    return data as string
} 

export const getImageFromAWS = async (name : string) => {
    const response = await fetch('/api/s3', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({name})
    })
    const data = await response.json()
    return data as string
}