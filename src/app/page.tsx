"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LayoutDashboard, Link as LinkIcon, Users, Lock, ShieldCheck, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      
      {/* Floating Navbar */}
      <div style={{ position: 'sticky', top: '1.5rem', zIndex: 50, padding: '0 1.5rem' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2.5rem', maxWidth: '1300px', margin: '0 auto', backgroundColor: 'var(--bg-nav)', backdropFilter: 'blur(16px)', borderRadius: '100px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-nav)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              <Image src="/logo.png" alt="Unlokise Logo" width={36} height={36} style={{ borderRadius: '8px' }} />
              Unlokise
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
              <Link href="#features" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>Features</Link>
              <Link href="#" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>How it works</Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <Link href="/login" style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem', padding: '0.5rem 1rem', borderRadius: '100px', transition: 'all 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--toggle-bg)')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
              Sign in
            </Link>
            <Link href="/register" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)', e.currentTarget.style.boxShadow = 'var(--shadow-md)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'none', e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}>
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '6rem 5% 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '5%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />

        <div style={{ zIndex: 1, position: 'relative', maxWidth: '800px' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: 'var(--bg-nav)', color: 'var(--accent)', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)', backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-sm)' }}>
            🚀 The #1 tool for content creators
          </div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            Lock your content, <br />
            <span style={{ background: 'linear-gradient(to right, var(--accent), #6366f1)', WebkitBackgroundClip: 'text', color: 'transparent' }}>grow your audience.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            Create smart links that require users to subscribe, follow, or join your community before they can access your premium content.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/register" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', boxShadow: 'var(--shadow-md)' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}>
              Create Your First Link <ArrowRight size={20} />
            </Link>
            <Link href="#features" style={{ backgroundColor: 'var(--bg-nav)', color: 'var(--text-main)', border: '1px solid var(--border-light)', backdropFilter: 'blur(10px)', padding: '1.2rem 2.5rem', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-solid)')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-nav)')}>
              View Demo
            </Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>No credit card required • Free forever plan available</p>
        </div>

        {/* Browser Mockup */}
        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '900px', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 1, backdropFilter: 'blur(20px)' }}>
          <div style={{ backgroundColor: 'var(--toggle-bg)', padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            <div style={{ marginLeft: '1rem', backgroundColor: 'var(--bg-card-solid)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={12} /> unlokise.com/your-secret-file
            </div>
          </div>
          
          <div style={{ padding: '4rem 2rem', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--bg-card-solid)', width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--toggle-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Lock size={32} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Premium Resource Pack</h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Complete the steps below to unlock</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, color: 'var(--text-main)' }}><Users size={20} color="var(--accent)" /> Subscribe on YouTube</div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--border-color)' }}></div>
                </div>
                <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, color: 'var(--text-main)' }}><LinkIcon size={20} color="var(--accent)" /> Join Discord Server</div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--border-color)' }}></div>
                </div>
              </div>
              
              <button style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--toggle-bg)', color: 'var(--text-muted)', border: 'none', borderRadius: '10px', fontWeight: 600, marginTop: '2rem', cursor: 'not-allowed' }}>
                Unlock File
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Everything you need to grow</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Simple, powerful tools designed specifically for modern content creators.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="hover-card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-nav)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--toggle-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={24} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Lightning Fast Setup</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Create your first locked link in under 60 seconds. No technical knowledge required.</p>
            </div>
            
            <div className="hover-card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-nav)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--toggle-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={24} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Secure Unlocking</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Advanced verification ensures users actually complete the steps before accessing content.</p>
            </div>
            
            <div className="hover-card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-nav)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--toggle-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <LayoutDashboard size={24} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Detailed Analytics</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Track views, completion rates, and audience growth directly from your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

