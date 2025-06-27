import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'notedwin-dev'
    const perPage = searchParams.get('per_page') || '10'
    
    // GitHub API endpoint
    const githubUrl = `https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=${perPage}&type=public`
    
    // Add GitHub token if available (optional but recommended for higher rate limits)
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    }
    
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }
    
    const response = await fetch(githubUrl, {
      headers,
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }
    
    const repos = await response.json()
    
    return NextResponse.json(repos)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}
