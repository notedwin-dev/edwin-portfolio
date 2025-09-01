import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'notedwin-dev'
    const perPage = parseInt(searchParams.get("per_page") || "12");
    const page = parseInt(searchParams.get("page") || "1");

    // GitHub API endpoint with pagination
    const githubUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${perPage}&page=${page}&type=public`;

    // Add GitHub token if available (optional but recommended for higher rate limits)
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(githubUrl, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const repos = await response.json();

    // Parse Link header to get pagination info
    const linkHeader = response.headers.get("Link");
    let totalPages = page; // Default to current page if no link header
    let hasNextPage = repos.length === perPage;

    if (linkHeader) {
      const links = linkHeader.split(",");
      const lastLink = links.find((link) => link.includes('rel="last"'));
      const nextLink = links.find((link) => link.includes('rel="next"'));

      if (lastLink) {
        const lastPageMatch = lastLink.match(/[?&]page=(\d+)/);
        if (lastPageMatch) {
          totalPages = parseInt(lastPageMatch[1]);
        }
      }

      hasNextPage = !!nextLink;
    }

    return NextResponse.json({
      repos,
      pagination: {
        currentPage: page,
        totalPages,
        perPage,
        hasNextPage,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}
