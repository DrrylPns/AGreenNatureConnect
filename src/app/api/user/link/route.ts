import axios from "axios"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const href = url.searchParams.get('url')

    if (!href) {
        return new Response("Invalid href", { status: 400 })
    }

    const res = await axios.get(href)

    //regular expression to para ma-match yung metadata ng kinukuhang URL
    const titleMatch = res.data.match(/<title>(.*?)<\/title>/)
    const title = titleMatch ? titleMatch[1] : ''

    const descriptionmatch = res.data.match(
        /<meta name="description" content="(.*?)"/)

    const description = descriptionmatch ? descriptionmatch[1] : ''

    const imageMatch = res.data.match(/<meta property="og:image" content="(.*?)"/)
    const imageUrl = imageMatch ? imageMatch[1] : ''

    return new Response(
        JSON.stringify({
            success: 1,
            meta: {
                title,
                description,
                image: {
                    url: imageUrl
                }
            }
        })
    )
}