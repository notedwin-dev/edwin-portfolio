"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Calendar,
  Code,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse {
  repos: GitHubRepo[];
  pagination: PaginationInfo;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    perPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubRepos = async (page: number = 1) => {
    try {
      setPageLoading(page !== 1); // Show page loading only for page changes
      setLoading(page === 1); // Show main loading only for initial load

      const response = await fetch(
        `/api/github/repos?username=notedwin-dev&per_page=12&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setRepos(data.repos);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch repositories"
      );
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos(1);
  }, []);

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && !pageLoading) {
      fetchGitHubRepos(page);
      // Scroll to top of repositories section
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const nextPage = () => goToPage(pagination.currentPage + 1);
  const prevPage = () => goToPage(pagination.currentPage - 1);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;

    // Always show first page
    if (totalPages > 1) pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 2);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 2);

    // Add ellipsis if needed
    if (rangeStart > 2) pages.push("...");

    // Add pages around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) pages.push(i);
    }

    // Add ellipsis if needed
    if (rangeEnd < totalPages - 1) pages.push("...");

    // Always show last page (if more than 1 page)
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-orange-500",
      "C++": "bg-blue-600",
      "C#": "bg-purple-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-500",
      Vue: "bg-green-400",
      React: "bg-blue-400",
      HTML: "bg-orange-400",
      CSS: "bg-blue-300",
      Shell: "bg-gray-500",
    };
    return language ? colors[language] || "bg-gray-400" : "bg-gray-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading repositories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-red-400 text-xl">Error: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-white text-black hover:bg-gray-200">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <span className="mr-2">←</span>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            GitHub Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of my open-source projects and contributions on GitHub
            {pagination.totalPages > 1 && (
              <span className="block text-sm mt-2 text-gray-500">
                Showing {repos.length} of{" "}
                {pagination.totalPages * pagination.perPage} repositories
              </span>
            )}
          </p>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Card
              key={repo.id}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-white hover:text-gray-300 transition-colors">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed min-h-[3rem]">
                  {repo.description || "No description available"}
                </p>

                {/* Language and Topics */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <Badge
                        className={`${getLanguageColor(
                          repo.language
                        )} text-white text-xs`}>
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-gray-700 text-gray-400 text-xs">
                        +{repo.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(repo.created_at)}</span>
                  </div>
                  <div>Updated {formatDate(repo.updated_at)}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black flex-1"
                    onClick={() => window.open(repo.html_url, "_blank")}>
                    <Code className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  {repo.homepage && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
                      onClick={() => window.open(repo.homepage!, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col items-center mt-12 space-y-4">
            {/* Page Info */}
            <div className="text-sm text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
              {pagination.perPage && ` • ${repos.length} repositories`}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrevPage || pageLoading}
                onClick={prevPage}
                className="bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNum, index) => (
                  <div key={index}>
                    {pageNum === "..." ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant={
                          pageNum === pagination.currentPage
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        disabled={pageLoading}
                        onClick={() => goToPage(pageNum as number)}
                        className={
                          pageNum === pagination.currentPage
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-500"
                        }>
                        {pageNum}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage || pageLoading}
                onClick={nextPage}
                className="bg-transparent border-gray-600 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Loading indicator for page changes */}
            {pageLoading && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Want to see more? Check out my complete GitHub profile
          </p>
          <Button
            variant="outline"
            className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-black"
            onClick={() =>
              window.open("https://github.com/notedwin-dev", "_blank")
            }>
            <Github className="h-4 w-4 mr-2" />
            View GitHub Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
