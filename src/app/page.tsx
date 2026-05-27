import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-container text-center animate-fade-in" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          LinkLocker
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Grow your audience by gating your premium content. Require users to complete actions before unlocking your links.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/login" className="btn btn-primary" style={{ flex: 1, maxWidth: '200px' }}>
            Login
          </Link>
          <Link href="/register" className="btn" style={{ flex: 1, maxWidth: '200px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Register
          </Link>
        </div>
      </div>
      
      <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px' }}>
        {[
          { title: 'Create Gates', desc: 'Easily set up sequential actions for users to complete.' },
          { title: 'Grow Fast', desc: 'Boost your YouTube subs, Twitter followers, and Discord members.' },
          { title: 'Analytics', desc: 'Track how many people unlocked your links.' }
        ].map((feature, i) => (
          <div key={i} className="glass-container animate-fade-in" style={{ flex: '1 1 250px', animationDelay: `${(i + 1) * 0.1}s` }}>
            <h3 style={{ color: 'var(--accent)' }}>{feature.title}</h3>
            <p style={{ margin: 0 }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
