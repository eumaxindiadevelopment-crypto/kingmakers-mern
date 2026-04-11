import { useState, useEffect } from 'react';
import { blogs as staticBlogs } from '../data/blogData';

const WP_API_URL =
    'https://kingmakersiasacademy.glamyfashions.com/admin/wp-json/wp/v2/posts?_embed&per_page=100&orderby=date&order=desc';

/**
 * Format a WordPress date string to a readable date like "March 27, 2025"
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Strip HTML tags and truncate for excerpt
 */
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

/**
 * Calculate rough read time from content
 */
function calcReadTime(html) {
    const words = stripHtml(html).split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
}

/**
 * Map a WordPress REST API post to the shape used by Blogs.jsx / BlogDetail.jsx
 */
function mapWpPost(post) {
    const featured =
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

    const rawExcerpt = post.excerpt?.rendered
        ? stripHtml(post.excerpt.rendered)
        : stripHtml(post.content?.rendered || '').substring(0, 200);

    // Get all categories for searching
    const categories = post._embedded?.['wp:term']?.[0] || [];
    const categoryNames = categories.map(cat => cat.name);
    const primaryCategory = categoryNames[0] || 'General';

    return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || 'Untitled',
        excerpt: rawExcerpt,
        category: primaryCategory,
        allCategories: categoryNames, // Store all for filtering
        date: formatDate(post.date),
        readTime: calcReadTime(post.content?.rendered || ''),
        image: featured,
        content: post.content?.rendered || '',
        source: 'wordpress',
        seo: {
            title: post.rank_math_seo?.title || (post.title?.rendered || ''),
            description: post.rank_math_seo?.description || '',
            canonical: post.rank_math_seo?.canonical || '',
            focusKeyword: post.rank_math_seo?.focus_kw || '',
            og: {
                title: post.rank_math_seo?.og_title || '',
                description: post.rank_math_seo?.og_description || '',
                image: post.rank_math_seo?.og_image || '',
            },
            twitter: {
                title: post.rank_math_seo?.twitter_title || '',
                description: post.rank_math_seo?.twitter_description || '',
                image: post.rank_math_seo?.twitter_image || '',
            }
        },
        elementorData: {
            isElementor: post.elementor_data?.is_elementor || false,
            cssUrls: post.elementor_data?.css_urls || [],
            postId: post.id
        }
    };
}

/**
 * useBlogPosts — fetches live posts from the WordPress REST API.
 * Optionally filters by category name (e.g., "Event").
 */
export function useBlogPosts(categoryName = null) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchPosts() {
            try {
                const res = await fetch(WP_API_URL, {
                    headers: { Accept: 'application/json' },
                    signal: AbortSignal.timeout(5000),
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                if (!cancelled) {
                    let mapped = data.map(mapWpPost);

                    // Filter if categoryName is provided
                    if (categoryName) {
                        const searchLower = categoryName.toLowerCase();
                        mapped = mapped.filter(post =>
                            post.allCategories.some(cat => cat.toLowerCase() === searchLower)
                        );
                    }

                    if (mapped.length > 0) {
                        setPosts(mapped);
                        setIsLive(true);
                    } else if (!categoryName || ['blog', 'blogs'].includes(categoryName.toLowerCase())) {
                        // Fallback for general blogs or specific 'Blogs' category
                        setPosts(staticBlogs);
                        setIsLive(false);
                    } else {
                        // No items found for other categories (like Events)
                        setPosts([]);
                        setIsLive(true);
                    }
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    // Fail gracefully
                    const isBlog = !categoryName || ['blog', 'blogs'].includes(categoryName.toLowerCase());
                    setPosts(isBlog ? staticBlogs : []);
                    setError('WordPress offline');
                    setIsLive(false);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPosts();
        return () => { cancelled = true; };
    }, [categoryName]);

    return { posts, loading, error, isLive };
}

export function findBySlug(posts, slug) {
    return posts.find((p) => p.slug === slug) || null;
}
