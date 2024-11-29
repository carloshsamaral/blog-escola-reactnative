import axios from "axios"

export default async function getPostagem() {
    let results = null;
    try {
        const response = await axios.get('http://10.0.0.3:3108/posts?limit=1000&page=1');

        const data = response.data[0];
        const id = data.id;
        const title = data.title;
        const content = data.content;
        const author = data.author;
        const createdAt = data.createdAt;

        results = {
            id: id,
            title: title,
            content: content,
            author: author,
            createdAt: createdAt
        };

        return results;

    } catch(error) {
        console.log(error)
    }
}