"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon, PlusCircle, ExternalLink, Activity, LogOut, Loader2 } from "lucide-react";

export default function DashboardClient({ user, signature }: { user: any, signature: string }) {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/links?t=" + Date.now(), { 
      cache: "no-store",
      headers: {
        "x-user-id": user.id,
        "x-signature": signature
      }
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Server returned HTML instead of JSON: " + text.substring(0, 150) + "...");
        }
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setLinks(data.links || []);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalSteps = links.reduce((acc, link) => acc + (link.steps?.length || 0), 0);

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <h1 style={{ color: '#ef4444' }}>Dashboard Error</h1>
        <p style={{ color: 'white', maxWidth: '800px', wordBreak: 'break-all' }}>{error}</p>
        <Link href="/api/auth/signout" className="btn btn-primary" style={{ marginTop: '20px' }}>Sign Out</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar Navigation */}
      <div className="glass-container" style={{ width: '280px', borderRadius: '0', borderLeft: 'none', borderTop: 'none', borderBottom: 'none', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '3rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/logo.png" alt="Unlokise Logo" width={32} height={32} style={{ borderRadius: '6px' }} /> Unlokise
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'rgba(59, 130, 246, 0.15)', borderLeft: '4px solid var(--accent)', borderRadius: '0 8px 8px 0', color: 'white', fontWeight: '500' }}>
            <Activity size={20} /> Overview
          </Link>
          <Link href="/dashboard/create" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="hover:text-white">
            <PlusCircle size={20} /> Create Link
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: '600', color: 'white' }}>{user?.name || 'User'}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email}</p>
            </div>
          </div>
          <Link href="/api/auth/signout" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f43f5e', fontSize: '0.9rem', padding: '8px 0' }}>
            <LogOut size={16} /> Sign Out
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Here is what's happening with your links today.</p>
            </div>
            <Link href="/dashboard/create" className="btn btn-primary animate-pulse" style={{ width: 'auto', padding: '0.8rem 1.5rem', display: 'flex', gap: '10px' }}>
              <PlusCircle size={20} /> New Link
            </Link>
          </header>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="glass-container" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '12px' }}>
                <LinkIcon size={32} color="var(--accent)" />
              </div>
              <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Links</p>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>{loading ? <Loader2 size={24} className="animate-spin" /> : links.length}</h2>
              </div>
            </div>
            <div className="glass-container" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '12px' }}>
                <Activity size={32} color="var(--btn-3)" />
              </div>
              <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Active Steps</p>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>{loading ? <Loader2 size={24} className="animate-spin" /> : totalSteps}</h2>
              </div>
            </div>
          </div>

          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Your Active Links</h3>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
               <Loader2 size={48} color="var(--accent)" className="animate-spin" />
            </div>
          ) : links.length === 0 ? (
            <div className="glass-container text-center animate-fade-in" style={{ padding: '4rem 2rem' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <LinkIcon size={40} color="var(--text-secondary)" />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>No Links Found</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You haven't created any locked links yet. Get started by creating your first one!</p>
              <Link href="/dashboard/create" className="btn btn-primary" style={{ width: 'auto' }}>
                Create First Link
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {links.map((link) => (
                <div key={link.id} className="glass-container animate-fade-in hover-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
                      {link.title}
                    </h3>
                    <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {link.steps?.length || 0} Steps
                    </span>
                  </div>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {link.description || 'No description provided.'}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <LinkIcon size={16} color="var(--text-secondary)" />
                    <a href={`/${link.slug}`} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', fontSize: '0.9rem', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      localhost:3000/{link.slug}
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href={`/${link.slug}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, padding: '0.6rem', display: 'flex', gap: '8px', fontSize: '0.95rem' }}>
                      <ExternalLink size={18} /> Visit Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
