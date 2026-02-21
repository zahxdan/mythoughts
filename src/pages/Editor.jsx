import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import RichTextEditor from '../components/RichTextEditor'

export default function Editor() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    if (!user) {
      alert('You must be logged in to save')
      return
    }

    setSaving(true)

    try {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = content
      const plainText = tempDiv.textContent || tempDiv.innerText || ''
      const excerpt = plainText.substring(0, 200).trim() + '...'

      const { error } = await supabase
        .from('posts')
        .insert({
          title: title.trim(),
          content: content,
          excerpt: excerpt,
          user_id: user.id,
        })

      if (error) throw error

      navigate('/')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Debug Info */}
        <div className="mb-4 p-3 bg-yellow-100 rounded text-sm">
          <strong>Debug:</strong> User: {user ? user.email : 'NOT LOGGED IN'}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-sans text-3xl font-bold text-ink">New Post</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-accent hover:text-ink font-sans text-sm transition-colors"
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

        <RichTextEditor 
          content={content} 
          onChange={setContent}
        />
      </div>
    </div>
  )
}
