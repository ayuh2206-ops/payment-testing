// pages/blog.jsx
// Blog / Journal — placeholder articles editable from admin
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const PLACEHOLDER_POSTS = [
  { title: 'Understanding Your Prakriti: A Guide to Ayurvedic Body Types', tag: 'Wellness', date: 'March 2025', excerpt: 'Discover your unique constitution — Vata, Pitta, or Kapha — and learn how to align your diet and lifestyle for optimal health according to Ayurvedic principles.' },
  { title: 'The Science Behind Classical Ayurvedic Manufacturing', tag: 'Science', date: 'February 2025', excerpt: 'How traditional Shastrokt methods meet modern GMP standards in the production of authentic Ayurvedic medicines at SB Ayurved.' },
  { title: 'Seasonal Eating: Ritucharya for Modern Life', tag: 'Diet', date: 'January 2025', excerpt: 'Ayurveda prescribes specific dietary regimens for each season. Learn how AyuAahar products make it easy to follow these ancient guidelines.' },
  { title: 'Panchakarma at Home: Simple Detox Rituals', tag: 'Rituals', date: 'December 2024', excerpt: 'While full Panchakarma requires clinical supervision, these simplified home practices can support your body\'s natural cleansing processes.' },
  { title: 'The Golden Spice: Turmeric in Ayurvedic Practice', tag: 'Ingredients', date: 'November 2024', excerpt: 'From ancient texts to modern research — exploring why Haridra (turmeric) remains one of Ayurveda\'s most valued botanicals.' },
  { title: 'Building Immunity Through Ayurvedic Diet', tag: 'Diet', date: 'October 2024', excerpt: 'More than 60% of Ayurved deals with diet. Discover how traditional food preparations can naturally strengthen your immune response.' },
];

const TAG_COLORS = {
  Wellness: { bg: 'rgba(203,234,208,0.3)', color: '#102A19' },
  Science: { bg: 'rgba(212,175,55,0.1)', color: '#D4AF37' },
  Diet: { bg: 'rgba(176,206,181,0.3)', color: '#324d39' },
  Rituals: { bg: 'rgba(213,227,216,0.4)', color: '#424842' },
  Ingredients: { bg: 'rgba(233,195,73,0.12)', color: '#735c00' },
};

export default function BlogPage() {
  return (
    <StoreLayout title="Journal" description="Ayurvedic wisdom, wellness tips, and insights from SB Ayurved">
      <PageHero
        title={<>The <span style={{ fontStyle:'italic' }}>Journal</span></>}
        breadcrumb="Blog"
        subtitle="Insights on Ayurvedic living, botanical science, and the art of natural wellness."
      />

      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        {/* Featured post */}
        <div style={{ marginBottom:48 }}>
          <GlassCard gold style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, padding:'clamp(32px,4vw,48px)', alignItems:'center' }} className="blog-featured">
            <div>
              <div style={{
                width:'100%', aspectRatio:'4/3', borderRadius:24,
                background:'linear-gradient(135deg, rgba(16,42,25,0.08), rgba(203,234,208,0.2))',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize:64, color:'rgba(16,42,25,0.15)' }}>article</span>
              </div>
            </div>
            <div>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.2em', color:'#D4AF37', display:'block', marginBottom:12 }}>Featured Article</span>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(22px,3vw,30px)', color:'#102A19', marginBottom:12, lineHeight:1.3 }}>
                Understanding Your Prakriti: A Guide to Ayurvedic Body Types
              </h3>
              <p style={{ fontSize:14, color:'#424842', lineHeight:1.75, marginBottom:20 }}>
                Discover your unique constitution — Vata, Pitta, or Kapha — and learn how to align your diet and lifestyle for optimal health.
              </p>
              <span style={{
                fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.1em',
                color:'#D4AF37', borderBottom:'1px solid #D4AF37', paddingBottom:2,
              }}>Read Article →</span>
            </div>
          </GlassCard>
        </div>

        {/* Post grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
          {PLACEHOLDER_POSTS.map((post, i) => {
            const tagStyle = TAG_COLORS[post.tag] || TAG_COLORS.Wellness;
            return (
              <div key={i} style={{
                background:'rgba(255,255,255,0.45)',
                backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
                borderTop:'1.5px solid rgba(255,255,255,0.8)',
                borderLeft:'1.5px solid rgba(255,255,255,0.8)',
                borderBottom:'1.5px solid rgba(255,255,255,0.2)',
                borderRight:'1.5px solid rgba(255,255,255,0.2)',
                borderRadius:28, padding:28, display:'flex', flexDirection:'column',
                boxShadow:'0 12px 28px rgba(16,42,25,0.04)',
                transition:'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(16,42,25,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(16,42,25,0.04)'; }}
              >
                {/* Image placeholder */}
                <div style={{
                  width:'100%', height:160, borderRadius:16, marginBottom:20,
                  background:'linear-gradient(135deg, rgba(203,234,208,0.2), rgba(213,227,216,0.3))',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize:36, color:'rgba(16,42,25,0.12)' }}>article</span>
                </div>
                {/* Tag + date */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <span style={{
                    fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em',
                    padding:'4px 10px', borderRadius:9999,
                    background: tagStyle.bg, color: tagStyle.color,
                  }}>{post.tag}</span>
                  <span style={{ fontSize:11, color:'#c2c8c0' }}>{post.date}</span>
                </div>
                <h4 style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102A19', marginBottom:8, lineHeight:1.4, flex:1 }}>{post.title}</h4>
                <p style={{ fontSize:13, color:'#424842', lineHeight:1.7, marginBottom:16 }}>{post.excerpt}</p>
                <span style={{
                  fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.1em',
                  color:'#D4AF37',
                }}>Read More →</span>
              </div>
            );
          })}
        </div>

        {/* Note for admin */}
        <div style={{ textAlign:'center', marginTop:48, padding:'24px 32px', borderRadius:20, background:'rgba(212,175,55,0.05)', border:'1px solid rgba(212,175,55,0.1)' }}>
          <p style={{ fontSize:13, color:'#424842', fontStyle:'italic' }}>
            Blog posts shown above are placeholders. Manage blog content from the admin panel → Pages → Blog, or create individual article pages.
          </p>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
