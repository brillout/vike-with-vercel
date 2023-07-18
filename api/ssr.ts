import { renderPage } from 'vite-plugin-ssr'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req
  console.log('Request to url:', url)
  if (url === undefined) throw new Error('req.url is undefined')

  const pageContextInit = { url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  console.log('httpResponse', !!httpResponse)

  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }

  const { body, statusCode, contentType } = httpResponse
  res.statusCode = statusCode
  res.setHeader('content-type', contentType)
  res.end(body)
}
