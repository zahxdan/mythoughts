import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return <div className="p-6 text-center text-accent font-sans">Loading editor...</div>
  }

  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-stone-100 border-b border-stone-300 p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('bold') ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          <strong>B</strong>
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('italic') ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          <em>I</em>
        </button>
        
        <div className="w-px bg-stone-300" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          H2
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          H3
        </button>
        
        <div className="w-px bg-stone-300" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('bulletList') ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          • List
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-sans transition-colors ${
            editor.isActive('orderedList') ? 'bg-ink text-paper' : 'bg-white hover:bg-stone-200'
          }`}
        >
          1. List
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="p-6 min-h-[400px] prose prose-lg max-w-none focus:outline-none"
      />
      
      <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-accent font-sans">
        ✨ Rich text editor: Bold, Italic, Headings, Lists
      </div>
    </div>
  )
}
