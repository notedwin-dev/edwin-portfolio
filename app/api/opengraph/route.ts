import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }    const html = await response.text()
    
    // Extract OpenGraph image using multiple regex patterns (more flexible matching)
    const ogImagePatterns = [
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
      /<meta\s+property=["']og:image:url["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image:url["']/i,
      /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i,
    ]
    
    let imageUrl = null
    
    // Try each pattern until we find a match
    for (const pattern of ogImagePatterns) {
      const match = html.match(pattern)
      if (match && match[1]) {
        imageUrl = match[1]
        break
      }
    }
    
    // Log for debugging
    console.log(`Fetching OpenGraph for: ${url}`)
    console.log(`Found image URL: ${imageUrl}`)
    
    if (imageUrl) {
      // Make sure we have a full URL
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : new URL(imageUrl, url).href
      console.log(`Final image URL: ${fullImageUrl}`)
      return NextResponse.json({ imageUrl: fullImageUrl })
    }

    return NextResponse.json({ imageUrl: null })
  } catch (error) {
    console.error('Error fetching OpenGraph data:', error)
    return NextResponse.json({ error: 'Failed to fetch OpenGraph data' }, { status: 500 })
  }
}
