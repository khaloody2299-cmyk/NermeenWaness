import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2 } from 'lucide-react';

function CodeEditor() {
  const [code, setCode] = useState('<?php\n  echo "مرحباً بك في عالم PHP!";\n?>');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('جاري تشغيل الكود على الخادم... (قد يستغرق بضع ثوانٍ)');
    setIsError(false);

    try {
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          compiler: 'php-8.3.12'
        })
      });

      if (!response.ok) {
        throw new Error('فشل الاتصال بخادم التشغيل.');
      }

      const data = await response.json();
      
      if (data.status === "0") {
        setOutput(data.program_output || 'تم التنفيذ بنجاح ولكن لم يتم طباعة أي مخرجات.');
        setIsError(false);
      } else {
        setOutput(data.program_error || data.compiler_error || 'حدث خطأ أثناء تنفيذ الكود.');
        setIsError(true);
      }
    } catch (err) {
      setOutput('تعذر تنفيذ الكود حالياً. يرجى التأكد من اتصالك بالإنترنت أو المحاولة لاحقاً.');
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--edu-border)' }}>
      <div style={{ padding: '12px 20px', background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', fontSize: '1rem' }}>محرر الأكواد (PHP)</span>
        <button 
          onClick={handleRun}
          disabled={isRunning}
          style={{ background: isRunning ? '#475569' : 'var(--edu-primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'background 0.2s' }}
        >
          {isRunning ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Play size={14} />} 
          {isRunning ? 'جاري التشغيل...' : 'تشغيل الكود'}
        </button>
      </div>
      <div style={{ flex: 1, borderTop: '1px solid #334155', direction: 'ltr', textAlign: 'left' }}>
        <Editor
          height="100%"
          defaultLanguage="php"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{ minimap: { enabled: false }, fontSize: 16, fontFamily: 'monospace' }}
        />
      </div>
      <div style={{ padding: '16px 20px', minHeight: '80px', background: isError ? 'var(--edu-danger-bg)' : 'var(--edu-bg)', color: 'var(--edu-text-main)', borderTop: '1px solid var(--edu-border)', direction: 'rtl' }}>
        <strong style={{ display: 'block', marginBottom: '4px', color: isError ? 'var(--edu-danger)' : 'var(--edu-text-muted)' }}>
          {isError ? 'رسالة الخطأ:' : 'مخرجات الكود (النتيجة):'}
        </strong>
        <span style={{ color: isError ? 'var(--edu-danger)' : (output ? 'var(--edu-success)' : 'var(--edu-text-muted)'), fontWeight: '600', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {output || 'اضغط على زر "تشغيل الكود" لرؤية النتيجة هنا...'}
        </span>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default CodeEditor;
