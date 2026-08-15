import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Database, ArrowLeft, Users } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <header style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        padding: '15px 60px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'var(--edu-surface)',
        borderBottom: '1px solid var(--edu-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
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
        <nav style={{ display: 'flex', gap: '30px', flex: 1, justifyContent: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--edu-primary)', fontWeight: '800', fontSize: '1rem', transition: 'color 0.2s' }}>الرئيسية</Link>
          <a href="/#features" style={{ textDecoration: 'none', color: 'var(--edu-text-body)', fontWeight: '600', fontSize: '1rem', transition: 'color 0.2s' }}>المميزات</a>
          <Link to="/learning" style={{ textDecoration: 'none', color: 'var(--edu-text-body)', fontWeight: '600', fontSize: '1rem', transition: 'color 0.2s' }}>الدروس</Link>
        </nav>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        background: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url("/code-bg.jpg") center/cover no-repeat',
        borderBottom: '1px solid var(--edu-border)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '2.2rem', color: 'white', fontWeight: '900', lineHeight: '1.4', marginBottom: '40px', textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
            تعلم البرمجة وقواعد البيانات <br/> 
            <span style={{ color: '#60a5fa' }}>بأسلوب عصري ومبسط</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/learning" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.5)' }}>
                ابدأ رحلة التعلم <ArrowLeft size={18} />
              </button>
            </Link>
            <a href="#features" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' }}>
                ماذا نقدم؟
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '60px 20px', background: 'var(--edu-bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--edu-text-main)', fontWeight: '900', marginBottom: '12px' }}>كل ما تحتاجه للنجاح الأكاديمي</h2>
          <p style={{ fontSize: '1rem', color: 'var(--edu-text-body)' }}>منهجية متكاملة لضمان استيعابك للمفاهيم وتطبيقها عملياً</p>
        </div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          <div className="surface-card" style={{ padding: '24px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '50px', height: '50px', background: 'var(--edu-primary-light)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <BookOpen size={24} color="var(--edu-primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--edu-text-main)', marginBottom: '12px', fontWeight: '800' }}>محتوى نظري منظم</h3>
            <p style={{ color: 'var(--edu-text-body)', fontSize: '1rem', lineHeight: '1.6' }}>
              شرح مبسط ومفصل للمفاهيم الأساسية مقسم إلى 21 درساً يسهل استيعابها ومراجعتها بتركيز تام.
            </p>
          </div>

          <div className="surface-card" style={{ padding: '24px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '50px', height: '50px', background: 'var(--edu-warning-bg)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Code size={24} color="var(--edu-warning)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--edu-text-main)', marginBottom: '12px', fontWeight: '800' }}>تطبيق عملي فوري</h3>
            <p style={{ color: 'var(--edu-text-body)', fontSize: '1rem', lineHeight: '1.6' }}>
              محرر أكواد مدمج داخل كل درس يسمح لك بتجربة الأكواد البرمجية ورؤية النتائج مباشرة دون مغادرة الصفحة.
            </p>
          </div>

          <div className="surface-card" style={{ padding: '24px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '50px', height: '50px', background: 'var(--edu-success-bg)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Database size={24} color="var(--edu-success)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--edu-text-main)', marginBottom: '12px', fontWeight: '800' }}>تقييم ذاتي واختبارات</h3>
            <p style={{ color: 'var(--edu-text-body)', fontSize: '1rem', lineHeight: '1.6' }}>
              أسئلة واختبارات تفاعلية في نهاية كل درس لقياس مدى الفهم والتأكد من استيعابك الكامل للمعلومات.
            </p>
          </div>

          <div className="surface-card" style={{ padding: '24px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Users size={24} color="#8b5cf6" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--edu-text-main)', marginBottom: '12px', fontWeight: '800' }}>إشراف أكاديمي موثوق</h3>
            <p style={{ color: 'var(--edu-text-body)', fontSize: '1rem', lineHeight: '1.6' }}>
              بإشراف الدكتورة نرمين وانيس، لضمان الموثوقية العلمية والتدرج المنطقي في عرض المعلومات للطلاب المبتدئين.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--edu-surface)', borderTop: '1px solid var(--edu-border)', padding: '40px 60px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 10px 0', color: 'var(--edu-text-main)', fontWeight: '900', fontSize: '1.5rem' }}>
          قواعد البيانات الخلفية للويب
        </h2>
        <p style={{ color: 'var(--edu-text-muted)', fontSize: '1rem' }}>
          منصة تعليمية صُممت بإشراف الدكتورة نرمين وانيس لدعم طلاب المعاهد العالية. © 2024
        </p>
      </footer>

    </div>
  );
}

export default HomePage;
