import { withPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import LockUI from "./LockUI";
import { Info } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LockedLinkPage({ params }: PageProps) {
  const { slug } = await params;
  
  const link = await withPrisma((db) =>
    db.link.findUnique({
      where: { slug },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    })
  );

  if (!link) {
    notFound();
  }
  
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Theme Toggle in top right */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
        <ThemeToggle />
      </div>

      {/* Premium Background Blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', opacity: 0.15, filter: 'blur(50px)', zIndex: 0 }} />
      
      <div className="glass-container animate-fade-in" style={{ width: '100%', maxWidth: '550px', zIndex: 1, position: 'relative', padding: '2.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)', borderRadius: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/logo.png" alt="Unlokise Logo" width={64} height={64} style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }} />
          </div>
          <h2 className="text-center" style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {link.title}
          </h2>
          {link.description && (
            <p className="text-center" style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
              {link.description}
            </p>
          )}
        </div>

        <LockUI steps={link.steps} targetUrl={link.targetUrl} />
        
        <div style={{ marginTop: '2.5rem', backgroundColor: 'var(--bg-input)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ marginBottom: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            <Info size={16} /> How to unlock
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {link.steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: 'var(--accent)',
                  width: '24px', height: '24px', 
                  borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 'bold', marginRight: '1rem', flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {index + 1}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Click <strong style={{ color: 'var(--text-main)' }}>{step.title}</strong> and wait {step.waitTime} seconds after returning.
                </div>
              </div>
            ))}
            
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10b981',
                width: '24px', height: '24px', 
                borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 'bold', marginRight: '1rem', flexShrink: 0,
                marginTop: '2px'
              }}>
                ✓
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Then the <strong style={{ color: 'var(--text-main)' }}>Unlock Link</strong> will activate!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
