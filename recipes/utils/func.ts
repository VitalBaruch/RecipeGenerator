export const wait = (duration : number) => {
    return new Promise(res => setTimeout(res, duration))
}

export const sendPromptToGPT = async (prompt: string) => {
    const response = await fetch('/api/gpt/generateRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({message : prompt})
            })
            const data = await response.json()
            return data as string
}