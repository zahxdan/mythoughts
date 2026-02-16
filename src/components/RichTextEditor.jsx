import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function RichTextEditor({ content, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Youtube,
      TextStyle,
      Color,
      FontFamily,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Upload Image to Supabase Storage
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `post-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      editor.chain().focus().setImage({ src: data.publicUrl }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  // Add YouTube Video
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL:')
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run()
    }
  }

  // AI Text Generation with Gemini
  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter a prompt for AI')
      return
    }

    setAiLoading(true)
    try {
      // Replace with your Gemini API Key
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

      const result = await model.generateContent(aiPrompt)
      const response = await result.response
      const text = response.text()

      // Insert AI-generated text at cursor
      editor.chain().focus().insertContent(text).run()
      setAiPrompt('')
    } catch (error) {
      console.error('Error generating AI text:', error)
      alert('Failed to generate AI text. Check your API key.')
    } finally {
      setAiLoading(false)
    }
  }

  if (!editor) return null

  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-stone-100 border-b border-stone-300 p-3 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${editor.isActive('strike') ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          <s>S</s>
        </button>

        <div className="w-px bg-stone-300" />

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          H3
        </button>

        <div className="w-px bg-stone-300" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-ink text-paper' : 'bg-white'}`}
        >
          1. List
        </button>

        <div className="w-px bg-stone-300" />

        {/* Media */}
        <label className="px-3 py-1 rounded text-sm bg-white cursor-pointer hover:bg-stone-200">
          📷 Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
        </label>
        <button
          onClick={addYoutubeVideo}
          className="px-3 py-1 rounded text-sm bg-white hover:bg-stone-200"
        >
          🎥 Video
        </button>

        <div className="w-px bg-stone-300" />

        {/* Font Size */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="px-2 py-1 rounded text-sm bg-white"
        >
          <option value="Inter">Inter</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Georgia">Georgia</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>

      {/* AI Assistant */}
      <div className="bg-blue-50 border-b border-blue-200 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI to write something... (e.g., 'Write an intro about sustainability')"
            className="flex-1 px-3 py-2 border border-stone-300 rounded text-sm"
            onKeyPress={(e) => e.key === 'Enter' && generateWithAI()}
          />
          <button
            onClick={generateWithAI}
            disabled={aiLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {aiLoading ? '✨ Generating...' : '✨ Generate'}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-reading max-w-none p-6 min-h-[400px] focus:outline-none"
      />

      {/* Upload Status */}
      {uploading && (
        <div className="p-3 bg-yellow-50 border-t border-yellow-200 text-sm text-yellow-800">
          Uploading image...
        </div>
      )}
    </div>
  )
}
