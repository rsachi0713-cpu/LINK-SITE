"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, CheckCircle2, Unlock, Lock, Loader2, ArrowRight } from "lucide-react";
import { FaYoutube, FaTiktok, FaDiscord, FaInstagram, FaXTwitter, FaFacebook, FaTelegram, FaSpotify } from "react-icons/fa6";

interface Step {
  id: string;
  order: number;
  title: string;
  url: string;
  waitTime: number;
}

interface LockUIProps {
  steps: Step[];
  targetUrl: string;
}

export default function LockUI({ steps, targetUrl }: LockUIProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startCountdown = (seconds: number, onFinish: () => void) => {
    setCountdown(seconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          onFinish();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStepClick = (stepIndex: number, url: string, waitTime: number) => {
    window.open(url, '_blank');
    
    startCountdown(waitTime, () => {
      if (stepIndex === steps.length - 1) {
        setUnlocked(true);
      } else {
        setCurrentStepIndex(stepIndex + 1);
      }
    });
  };

  // Get progressive colors for steps
  const getStepStyle = (index: number, isActive: boolean, isCompleted: boolean) => {
    if (isCompleted) {
      return { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' };
    }
    if (isActive) {
      return { background: 'var(--accent)', border: 'none', color: 'white', boxShadow: 'var(--shadow-md)' };
    }
    return { background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' };
  };

  // Get dynamic icon based on URL
  const getPlatformIcon = (url: string) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return <FaYoutube size={22} />;
    if (lowerUrl.includes('tiktok.com')) return <FaTiktok size={22} />;
    if (lowerUrl.includes('discord.com') || lowerUrl.includes('discord.gg')) return <FaDiscord size={22} />;
    if (lowerUrl.includes('instagram.com')) return <FaInstagram size={22} />;
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <FaXTwitter size={22} />;
    if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com') || lowerUrl.includes('fb.watch')) return <FaFacebook size={22} />;
    if (lowerUrl.includes('t.me') || lowerUrl.includes('telegram.org')) return <FaTelegram size={22} />;
    if (lowerUrl.includes('spotify.com')) return <FaSpotify size={22} />;
    return <ExternalLink size={22} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '5px' }}>
        {steps.map((_, i) => (
          <div key={i} style={{ 
            height: '6px', 
            flex: 1, 
            borderRadius: '3px', 
            backgroundColor: i < currentStepIndex || unlocked ? '#10b981' : (i === currentStepIndex ? 'var(--accent)' : 'var(--border-color)'),
            transition: 'background-color 0.4s ease'
          }} />
        ))}
        <div style={{ 
            height: '6px', 
            flex: 1, 
            borderRadius: '3px', 
            backgroundColor: unlocked ? 'var(--accent)' : 'var(--border-color)',
            transition: 'background-color 0.4s ease'
          }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex && !unlocked && countdown === null;
          const isCompleted = index < currentStepIndex || unlocked;
          const isWaiting = index === currentStepIndex && countdown !== null;
          const styles = getStepStyle(index, isActive, isCompleted);
          
          return (
            <button
              key={step.id}
              className={`btn hover-card ${isActive ? 'animate-pulse' : ''}`}
              disabled={!isActive}
              onClick={() => handleStepClick(index, step.url, step.waitTime)}
              style={{ 
                ...styles,
                padding: '1.2rem 1.5rem',
                fontSize: '1.1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: isActive ? 'pointer' : 'not-allowed',
                transform: isActive ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isCompleted ? <CheckCircle2 size={22} /> : (isWaiting ? <Loader2 className="animate-spin" size={22} /> : getPlatformIcon(step.url))}
                <span style={{ fontWeight: 600 }}>{step.title}</span>
              </div>
              
              {!isCompleted && !isWaiting && (
                <span style={{ fontSize: '0.85rem', opacity: isActive ? 1 : 0.5, backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: '20px' }}>
                  Wait {step.waitTime}s
                </span>
              )}
              {isWaiting && (
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{countdown}s</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        className="btn hover-card"
        disabled={!unlocked}
        onClick={() => window.open(targetUrl, '_blank')}
        style={{ 
          padding: '1.2rem', 
          fontSize: '1.15rem', 
          marginTop: '1.5rem',
          background: unlocked ? 'var(--accent)' : 'var(--bg-input)',
          color: unlocked ? 'white' : 'var(--text-muted)',
          border: unlocked ? 'none' : '1px dashed var(--border-color)',
          boxShadow: unlocked ? 'var(--shadow-md)' : 'none',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          fontWeight: 700,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: unlocked ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {unlocked ? <Unlock size={22} /> : <Lock size={22} />}
        {unlocked ? "Unlock & Proceed" : "Complete steps to unlock"}
        {unlocked && <ArrowRight size={22} />}
      </button>

      {/* Modern Status Display */}
      <div style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
        {countdown !== null ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 'bold', padding: '8px 16px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.2)' }} className="animate-pulse">
            <Loader2 className="animate-spin" size={18} />
            Verifying step... please wait {countdown}s
          </div>
        ) : (
          unlocked && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 'bold', padding: '8px 16px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.2)' }} className="animate-fade-in">
              <CheckCircle2 size={18} />
              Link successfully unlocked!
            </div>
          )
        )}
      </div>
    </div>
  );
}
