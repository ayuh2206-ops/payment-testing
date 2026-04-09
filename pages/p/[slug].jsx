// pages/p/[slug].jsx
// Dynamic CMS page renderer — fetches content from admin-managed site_pages table
// Used for: terms, privacy, wellness, blog, offer-zone, cosmetics, and any new pages
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

export default function CMSPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/p/${slug}`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
      .then(d => { setPage(d.page); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <StoreLayout title="Loading...">
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh' }}>
        <div style={{
          width:32, height:32, border:'2px solid rgba(16,42,25,0.1)',
          borderTopColor:'#D4AF37', borderRadius:'50%',
          animation:'spin 0.7s linear infinite',
        }}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </StoreLayout>
  );

  if (error || !page) return (
    <StoreLayout title="Page Not Found">
      <div style={{ textAlign:'center', padding:'120px 32px', minHeight:'60vh' }}>
        <span className="material-symbols-outlined" style={{ fontSize:64, color:'rgba(194,200,192,0.4)', display:'block', marginBottom:20 }}>search_off</span>
        <h1 style={{ fontFamily:'Newsreader,serif', fontSize:36, fontWeight:300, color:'#102A19', marginBottom:12 }}>Page not found</h1>
        <p style={{ fontSize:15, color:'#424842', marginBottom:32 }}>This page doesn't exist or hasn't been published yet.</p>
        <a href="/" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'#102A19', color:'#fff', padding:'14px 32px', borderRadius:9999,
          fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none',
        }}>
          Back to Home <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
        </a>
      </div>
    </StoreLayout>
  );

  return (
    <StoreLayout title={page.seo_title || page.title} description={page.seo_description || ''}>
      <PageHero title={page.title} breadcrumb={page.title} />

      <section style={{ maxWidth:840, margin:'0 auto', padding:'0 32px 80px' }}>
        <GlassCard style={{ padding:'clamp(32px,5vw,56px)' }}>
          {page.content ? (
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.9, fontFamily:'Manrope,sans-serif' }}>
              {renderMarkdown(page.content)}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize:48, color:'rgba(194,200,192,0.3)', display:'block', marginBottom:16 }}>edit_note</span>
              <p style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'rgba(16,42,25,0.3)' }}>
                Content coming soon.
              </p>
              <p style={{ fontSize:13, color:'rgba(66,72,66,0.4)', marginTop:8 }}>
                This page can be edited from the admin panel → Pages → {page.title}
              </p>
            </div>
          )}
        </GlassCard>
      </section>
    </StoreLayout>
  );
}

// Simple markdown-to-JSX renderer for CMS content
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const k = key++;

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={k} style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102A19', margin:'28px 0 12px' }}>{processInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={k} style={{ fontFamily:'Newsreader,serif', fontSize:26, fontWeight:400, color:'#102A19', margin:'36px 0 16px' }}>{processInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={k} style={{ fontFamily:'Newsreader,serif', fontSize:32, fontWeight:300, color:'#102A19', margin:'40px 0 20px' }}>{processInline(line.slice(2))}</h1>);
    }
    // Horizontal rule
    else if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={k} style={{ border:'none', height:1, background:'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)', margin:'32px 0' }} />);
    }
    // List items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={k} style={{ display:'flex', gap:12, marginBottom:8, paddingLeft:8 }}>
          <span style={{ color:'#D4AF37', fontSize:14, lineHeight:'1.9', flexShrink:0 }}>•</span>
          <span>{processInline(line.slice(2))}</span>
        </div>
      );
    }
    // Empty line = spacing
    else if (line.trim() === '') {
      elements.push(<div key={k} style={{ height:8 }} />);
    }
    // Normal paragraph
    else {
      elements.push(<p key={k} style={{ marginBottom:16 }}>{processInline(line)}</p>);
    }
  }

  return elements;
}

function processInline(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#102A19;font-weight:600">$1</strong>');
  // Italic
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#D4AF37;text-decoration:underline;text-underline-offset:3px">$1</a>');
  // Images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:16px;margin:16px 0" />');

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}
