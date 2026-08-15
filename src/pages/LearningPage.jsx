import React, { useState, useEffect } from 'react';
import { 
  Check, X, ArrowRight, ArrowLeft,
  Target, Code, ChevronLeft, Book
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { lessonsData } from '../data/lessons';
import CodeEditor from '../components/CodeEditor';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const arabicNumbers = [
  "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر", "التاسع عشر", "العشرين", "الحادي والعشرين"
];

function LearningPage() {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState(() => {
    const saved = localStorage.getItem('activeLessonId');
    const parsedId = saved ? parseInt(saved) : 1;
    if (!lessonsData.find(l => l.id === parsedId)) return lessonsData[0].id;
    return parsedId;
  });
  
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const activeLesson = lessonsData.find(l => l.id === activeLessonId) || lessonsData[0];
  const activeLessonIndex = lessonsData.findIndex(l => l.id === activeLesson.id);

  useEffect(() => {
    localStorage.setItem('activeLessonId', activeLessonId);
  }, [activeLessonId]);

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/content/lesson_${activeLessonId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Lesson content not found');
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setIsLoading(false);
      })
      .catch((err) => {
        setMarkdownContent(`> **تنبيه:** محتوى هذا الدرس قيد الإعداد.\n\n ${activeLesson?.content || ''}`);
        setIsLoading(false);
      });
  }, [activeLessonId]);

  const handleLessonChange = (id) => {
    setActiveLessonId(id);
    setSelectedAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    let allCorrect = true;
    activeLesson.quiz.forEach((q, index) => {
      if (selectedAnswers[index] !== q.correctAnswer) allCorrect = false;
    });
    if (allCorrect) {
      setCompletedLessons(prev => ({ ...prev, [activeLessonId]: true }));
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--edu-bg)', minHeight: '100vh', width: '100%' }}>
      
      {/* Header (Navbar) */}
      <header className="main-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }} onClick={() => navigate('/')}>
          <div style={{ 
            background: 'var(--edu-primary)', 
            width: '38px', 
            height: '38px', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
          }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.6rem', lineHeight: 1, marginTop: '-4px' }}>ن</span>
          </div>
          <h2 style={{ margin: 0, color: 'var(--edu-text-main)', fontWeight: '900', fontSize: '1.2rem' }}>
            قواعد البيانات الخلفية للويب
          </h2>
        </div>
        <nav className="main-header-nav">
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--edu-text-body)', fontWeight: '600', fontSize: '1rem', transition: 'color 0.2s' }}>الرئيسية</Link>
          <a href="/#features" style={{ textDecoration: 'none', color: 'var(--edu-text-body)', fontWeight: '600', fontSize: '1rem', transition: 'color 0.2s' }}>المميزات</a>
          <Link to="/learning" style={{ textDecoration: 'none', color: 'var(--edu-primary)', fontWeight: '800', fontSize: '1rem', transition: 'color 0.2s' }}>الدروس</Link>
        </nav>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container - RTL Grid Layout */}
      <div className="learning-layout">
        
        {/* 1. Main Content Area (On the RIGHT due to DOM order + RTL) */}
        <main className="learning-content">
          
          {/* Lesson Header */}
          <div style={{ 
            background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url("/code-bg.jpg") center/cover no-repeat', 
            borderRadius: '16px', 
            padding: '50px 40px', 
            border: '1px solid var(--edu-border)',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', color: 'white', padding: '6px 16px', borderRadius: '50px', fontWeight: '800', marginBottom: '16px', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}>
                الدرس {arabicNumbers[activeLessonIndex] || (activeLessonIndex + 1)}
              </div>
              <h1 className="lesson-header-title">
                {activeLesson?.title}
              </h1>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="surface-card markdown-body" style={{ 
            padding: '40px',
            marginBottom: '40px'
          }}>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--edu-text-muted)' }}>جاري تحميل المحتوى...</div>
            ) : (
              <ReactMarkdown
                children={markdownContent}
                components={{
                  h1: () => null, // Hide the duplicate title from Markdown
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <div style={{ direction: 'ltr', textAlign: 'left', margin: '30px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--edu-border)' }}>
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      </div>
                    ) : (
                      <code className={className} style={{ background: 'var(--edu-primary-light)', padding: '2px 6px', borderRadius: '4px', color: 'var(--edu-primary-dark)', fontWeight: '700', fontSize: '0.9em' }} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              />
            )}
          </div>

          {/* Code Editor */}
          {!isLoading && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--edu-text-main)', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Code color="var(--edu-primary)" size={28} />
                التطبيق العملي
              </h2>
              <CodeEditor />
            </div>
          )}

          {/* Quiz Section */}
          {activeLesson.quiz && activeLesson.quiz.length > 0 && (
            <div className="surface-card" style={{ padding: '30px', marginBottom: '40px' }}>
              <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--edu-border)', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--edu-text-main)', margin: '0 0 8px 0', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target color="var(--edu-primary)" size={24} />
                  اختبار سريع
                </h2>
                <p style={{ color: 'var(--edu-text-body)', fontSize: '0.95rem', margin: 0 }}>تأكد من استيعابك للمعلومات بشكل كامل</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {activeLesson.quiz.map((q, qIndex) => (
                  <div key={qIndex} style={{ background: 'var(--edu-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--edu-border)' }}>
                    <h3 style={{ margin: '0 0 16px 0', color: 'var(--edu-text-main)', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.5' }}>
                      {qIndex + 1}. {q.question}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[qIndex] === optIndex;
                        let optionStyle = {
                          padding: '12px 16px',
                          borderRadius: '8px',
                          cursor: showResults ? 'default' : 'pointer',
                          border: '2px solid',
                          borderColor: isSelected ? 'var(--edu-primary)' : 'var(--edu-border)',
                          background: isSelected ? 'var(--edu-primary-light)' : 'var(--edu-surface)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s ease',
                          fontSize: '0.95rem',
                          color: isSelected ? 'var(--edu-primary)' : 'var(--edu-text-main)',
                          fontWeight: isSelected ? '700' : '600',
                        };

                        let Icon = null;
                        if (showResults) {
                          const isCorrect = optIndex === q.correctAnswer;
                          if (isCorrect) {
                            optionStyle.borderColor = 'var(--edu-success)';
                            optionStyle.background = 'var(--edu-success-bg)';
                            optionStyle.color = 'var(--edu-success)';
                            Icon = <Check size={18} color="var(--edu-success)" />;
                          } else if (isSelected && !isCorrect) {
                            optionStyle.borderColor = 'var(--edu-danger)';
                            optionStyle.background = 'var(--edu-danger-bg)';
                            optionStyle.color = 'var(--edu-danger)';
                            Icon = <X size={18} color="var(--edu-danger)" />;
                          }
                        }

                        return (
                          <div 
                            key={optIndex} 
                            onClick={() => handleAnswerSelect(qIndex, optIndex)} 
                            style={optionStyle}
                            onMouseEnter={(e) => {
                              if (!showResults && !isSelected) e.currentTarget.style.borderColor = 'var(--edu-text-muted)';
                            }}
                            onMouseLeave={(e) => {
                              if (!showResults && !isSelected) e.currentTarget.style.borderColor = 'var(--edu-border)';
                            }}
                          >
                            <span>{opt}</span>
                            {Icon}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--edu-border)', paddingTop: '24px' }}>
                {!showResults ? (
                  <button 
                    onClick={handleCheckAnswers}
                    disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                    className="btn-primary"
                    style={{ padding: '12px 32px', fontSize: '1.05rem' }}
                  >
                    تأكيد الإجابات
                  </button>
                ) : (
                  <button 
                    onClick={() => { setShowResults(false); setSelectedAnswers({}); }}
                    className="btn-outline"
                    style={{ padding: '12px 32px', fontSize: '1.05rem' }}
                  >
                    إعادة المحاولة
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Between Lessons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid var(--edu-border)' }}>
            <button 
              onClick={() => { handleLessonChange(lessonsData[activeLessonIndex - 1].id); }}
              disabled={activeLessonIndex === 0}
              className="btn-outline"
            >
              <ArrowRight size={20} /> الدرس السابق
            </button>
            <button 
              onClick={() => { handleLessonChange(lessonsData[activeLessonIndex + 1].id); }}
              disabled={activeLessonIndex === lessonsData.length - 1}
              className="btn-primary"
            >
              الدرس التالي <ArrowLeft size={20} />
            </button>
          </div>

        </main>

        {/* 2. Left Sidebar (Index) - On the LEFT due to DOM order + RTL */}
        <aside className="learning-sidebar">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--edu-text-main)', margin: '0 0 20px 0', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Book size={20} color="var(--edu-text-muted)" />
            فهرس الدروس
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lessonsData.map((lesson, index) => {
              const isActive = lesson.id === activeLessonId;
              const isCompleted = completedLessons[lesson.id];
              return (
                <div 
                  key={lesson.id} 
                  onClick={() => handleLessonChange(lesson.id)}
                  style={{ 
                    padding: '12px 16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    background: isActive ? 'var(--edu-primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--edu-text-body)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--edu-bg)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: isCompleted ? 'var(--edu-success)' : (isActive ? 'white' : 'var(--edu-border)'),
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      color: isCompleted ? 'white' : (isActive ? 'var(--edu-primary)' : 'var(--edu-text-muted)'),
                    }}>
                      {isCompleted ? <Check size={14} /> : (index + 1)}
                    </div>
                    <span style={{ 
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '0.95rem'
                    }}>
                      الدرس {index + 1}
                    </span>
                  </div>
                  {isActive && <ChevronLeft size={18} color="white" />}
                </div>
              );
            })}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default LearningPage;
