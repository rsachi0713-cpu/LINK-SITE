"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, KeyRound, Loader2, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isRegistered = searchParams?.get("registered") === "true";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(isRegistered ? "Registration successful! Please login to continue." : "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. If you just registered, the server might be warming up, please try again.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Simple Header */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
          <Image src="/logo.png" alt="Unlokise Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
          Unlokise
        </Link>
        <div style={{ position: 'absolute', right: '2rem', top: '2rem' }}>
          <ThemeToggle />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          backdropFilter: 'blur(16px)',
          padding: '3rem 2.5rem', 
          borderRadius: '24px', 
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          width: '100%',
          maxWidth: '450px'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center', marginBottom: '0.5rem' }}>Welcome back</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your details to access your dashboard.</p>
          
          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: 500 }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#16a34a', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: 500 }}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required 
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem', color: 'var(--text-main)', backgroundColor: 'var(--bg-input)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <KeyRound size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '1rem', color: 'var(--text-main)', backgroundColor: 'var(--bg-input)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ 
              width: '100%', padding: '1rem', marginTop: '1rem', borderRadius: '12px', 
              backgroundColor: 'var(--accent)', color: 'white', border: 'none', 
              fontWeight: 600, fontSize: '1.05rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              transition: 'background-color 0.2s, transform 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.backgroundColor = 'var(--accent-hover)'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> Logging in...</> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Don't have an account? <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
