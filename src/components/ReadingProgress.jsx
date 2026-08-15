import React, { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (docHeight === winHeight) {
        setScrollProgress(0);
        return;
      }
      
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      
      setScrollProgress(scrollPercentRounded > 100 ? 100 : (scrollPercentRounded < 0 ? 0 : scrollPercentRounded));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'transparent',
      zIndex: 99999, // Super high z-index to stay above everything
    }}>
      <div style={{
        height: '100%',
        width: `${scrollProgress}%`,
        background: 'var(--edu-primary)', // It will change to blue/blue-light depending on theme
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 8px var(--edu-primary)',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px'
      }} />
    </div>
  );
}
