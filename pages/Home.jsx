import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getExcerpt = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent font-sans">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-ink mb-4">
            MyThoughts
          </h1>
          <p className="text-lg text-accent font-serif">
            Personal reflections and musings
          </p>
        </header>

        {/* Posts List */}
        <main className="space-y-12">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-accent font-serif">
                No posts yet. {user && "Click 'Write' to create your first post!"}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="group">
                <Link to={`/post/${post.id}`}>
                  {/* Date */}
                  <time className="text-sm text-accent font-sans uppercase tracking-wide block mb-2">
                    {formatDate(post.created_at)}
                  </time>
                  
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-sans font-bold text-ink mb-3
                               group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-lg text-ink font-serif leading-relaxed mb-4">
                    {getExcerpt(post.content)}
                  </p>
                  
                  {/* Read More */}
                  <span className="text-sm font-sans font-medium text-accent 
                                 group-hover:text-ink transition-colors">
                    Read more →
                  </span>
                </Link>

                {/* Admin Edit Link */}
                {user && (
                  <div className="mt-3">
                    <Link
                      to={`/editor?id=${post.id}`}
                      className="text-sm font-sans text-accent hover:text-ink transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </article>
            ))
          )}
        </main>
      </div>
    </div>
  )
}
