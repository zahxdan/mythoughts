import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Editor() {
  const [searchParams] = useSearchParams()
  const postId = searchParams.get('id')
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load existing post if editing
  useEffect(() => {
    if (postId) {
      loadPost()
    }
  }, [postId])

  async function loadPost() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) throw error

      setTitle(data.title)
      setContent(data.content)
    } catch (error) {
      console.error('Error loading post:', error)
      alert('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    setSaving(true)

    try {
      if (postId) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update({
            title: title.trim(),
            content: content.trim(),
          })
          .eq('id', postId)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert({
            title: title.trim(),
            content: content.trim(),
            user_id: user.id,
          })

        if (error) throw error
      }

      navigate('/')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    if (title || content) {
      if (!confirm('Discard unsaved changes?')) return
    }
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent font-sans">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Editor Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-sans font-bold text-ink">
            {postId ? 'Edit Post' : 'New Post'}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-accent hover:text-ink font-sans text-sm 
                       transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-ink text-paper font-sans font-medium rounded-md
                       hover:bg-accent transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full px-0 py-4 font-sans text-4xl md:text-5xl font-bold text-ink
                     placeholder-stone-300 border-0 border-b-2 border-stone-200
                     focus:outline-none focus:border-accent bg-transparent
                     transition-colors"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing...

Use double line breaks to create new paragraphs.

Write naturally and let your thoughts flow."
            className="w-full min-h-[500px] px-0 py-4 font-serif text-lg md:text-xl text-ink
                     placeholder-stone-300 border-0 resize-none
                     focus:outline-none bg-transparent leading-relaxed"
          />
        </div>

        {/* Writing Tips */}
        <div className="mt-12 p-6 bg-stone-100 rounded-lg">
          <h3 className="font-sans text-base font-semibold text-ink mb-3">
            Writing Tips
          </h3>
          <ul className="font-sans text-sm text-accent space-y-2">
            <li>• Use double line breaks to separate paragraphs</li>
            <li>• Keep paragraphs focused on a single idea</li>
            <li>• Write in your natural voice</li>
            <li>• Don't worry about perfection—just write</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
