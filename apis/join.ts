const api = 'localhost:8080/post'

const join =  async (name: string) => {
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

}