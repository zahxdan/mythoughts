import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function PostView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate('/')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Format content into paragraphs
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-6">
        {paragraph}
      </p>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent font-sans">Loading...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-accent font-serif text-lg mb-4">Post not found</p>
          <Link to="/" className="text-accent hover:text-ink underline font-sans">
            Return home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper">
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-accent hover:text-ink 
                   font-sans text-sm mb-8 transition-colors"
        >
          ← All Posts
        </Link>

        {/* Date */}
        <time className="text-sm text-accent font-sans uppercase tracking-wide block mb-4">
          {formatDate(post.created_at)}
        </time>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-ink mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose-reading">
          {formatContent(post.content)}
        </div>

        {/* Admin Actions */}
        {user && (
          <div className="mt-12 pt-8 border-t border-stone-200 flex items-center gap-6">
            <Link
              to={`/editor?id=${post.id}`}
              className="text-sm font-sans text-accent hover:text-ink transition-colors"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="text-sm font-sans text-red-600 hover:text-red-800 transition-colors"
            >
              Delete Post
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12">
          <Link 
            to="/" 
            className="text-accent hover:text-ink font-sans text-sm transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  )
}
