'use client'
import Link from 'next/link'

export default function EmbedCodePage() {
  const script = `<script>
  (function() {
    var btn = document.createElement('button');
    btn.innerHTML = '💬';
    btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:#2563EB;color:white;font-size:24px;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;';

    var iframe = document.createElement('iframe');
    iframe.src = '${typeof window !== 'undefined' ? window.location.origin : ''}/embed';
    iframe.style.cssText = 'position:fixed;bottom:92px;right:24px;width:380px;height:500px;border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:9998;display:none;';

    btn.onclick = function() {
      iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
    };

    document.body.appendChild(btn);
    document.body.appendChild(iframe);
  })();
<\/script>`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
          <span className="font-bold text-gray-900 text-lg">Build Your Bot</span>
        </div>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Embed Your Bot</h1>
        <p className="text-gray-500 mb-6">Paste this snippet before the closing &lt;/body&gt; tag on your website.</p>

        <div className="bg-gray-900 rounded-2xl p-5">
          <pre className="text-green-400 text-xs overflow-x-auto whitespace-pre-wrap">{script}</pre>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(script)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium"
        >
          Copy Code
        </button>
      </main>
    </div>
  )
}
