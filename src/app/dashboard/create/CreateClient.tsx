"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClient({ userId, signature }: { userId: string, signature: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  
  const [steps, setSteps] = useState([
    { title: "Ad Step 1", url: "", waitTime: 10 }
  ]);

  const addStep = () => {
    setSteps([...steps, { title: `Ad Step ${steps.length + 1}`, url: "", waitTime: 10 }]);
  };

  const updateStep = (index: number, field: string, value: string | number) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-user-id": userId,
          "x-signature": signature
        },
        body: JSON.stringify({ title, description, targetUrl, steps }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-container animate-fade-in" style={{ width: '100%', maxWidth: '700px' }}>
        <h2 style={{ marginBottom: '2rem' }}>Create New Locked Link</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Link Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Premium Software Download" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea 
              className="form-input" 
              placeholder="Instructions for the user..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '3rem' }}>
            <label className="form-label">Final Target URL</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="e.g. https://mega.nz/file/..." 
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
            />
          </div>

          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Ad Steps Configuration</h3>
          
          {steps.map((step, index) => (
            <div key={index} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0 }}>Step {index + 1}</h4>
                {steps.length > 1 && (
                  <button type="button" onClick={() => removeStep(index)} style={{ background: 'none', border: 'none', color: 'var(--btn-1)', cursor: 'pointer', fontWeight: 'bold' }}>
                    Remove
                  </button>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1 1 100%' }}>
                  <label className="form-label">Button Text</label>
                  <input type="text" className="form-input" value={step.title} onChange={(e) => updateStep(index, 'title', e.target.value)} required />
                </div>
                
                <div className="form-group" style={{ flex: '1 1 calc(70% - 0.5rem)' }}>
                  <label className="form-label">Ad URL</label>
                  <input type="url" className="form-input" placeholder="https://ad-network.com/..." value={step.url} onChange={(e) => updateStep(index, 'url', e.target.value)} required />
                </div>
                
                <div className="form-group" style={{ flex: '1 1 calc(30% - 0.5rem)' }}>
                  <label className="form-label">Wait Time (sec)</label>
                  <input type="number" className="form-input" min="1" value={step.waitTime} onChange={(e) => updateStep(index, 'waitTime', parseInt(e.target.value))} required />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addStep} className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '3rem' }}>
            + Add Another Step
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '1rem', fontSize: '1.1rem' }}>
            {loading ? "Creating..." : "Create Locked Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
