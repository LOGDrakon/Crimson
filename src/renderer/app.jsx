const { useState, useEffect, useRef, useMemo } = React;

// -------- Utils de couleurs --------
const clamp = (n,min,max)=>Math.min(max,Math.max(min,n));
const sanitizeHex = (hex)=>{ if(!hex) return '#000000'; let h=hex.trim().toLowerCase(); if(!h.startsWith('#')) h='#'+h; if(h.length===4) h='#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3]; return /^#([0-9a-f]{6})$/.test(h)?h:'#000000'; };
const Color={
  hexToHsl(hex){ hex=sanitizeHex(hex); const r=parseInt(hex.slice(1,3),16)/255; const g=parseInt(hex.slice(3,5),16)/255; const b=parseInt(hex.slice(5,7),16)/255; const max=Math.max(r,g,b), min=Math.min(r,g,b); let h,s; let l=(max+min)/2; if(max===min){h=s=0;} else { const d=max-min; s=l>.5? d/(2-max-min) : d/(max+min); switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;} h/=6;} return [Math.round(h*360),Math.round(s*100),Math.round(l*100)]; },
  hslToHex(h,s,l){ h=((h%360)+360)%360; s/=100; l/=100; const c=(1-Math.abs(2*l-1))*s; const x=c*(1-Math.abs((h/60)%2-1)); const m=l-c/2; let r,g,b; if(h<60)[r,g,b]=[c,x,0]; else if(h<120)[r,g,b]=[x,c,0]; else if(h<180)[r,g,b]=[0,c,x]; else if(h<240)[r,g,b]=[0,x,c]; else if(h<300)[r,g,b]=[x,0,c]; else [r,g,b]=[c,0,x]; const toHex=v=>Math.round((v+m)*255).toString(16).padStart(2,'0'); return `#${toHex(r)}${toHex(g)}${toHex(b)}`; },
  lighten(hex,amount){ const [h,s,l]=this.hexToHsl(hex); return this.hslToHex(h,s,clamp(l+amount,0,100)); },
  saturate(hex,amount){ const [h,s,l]=this.hexToHsl(hex); return this.hslToHex(h,clamp(s+amount,0,100),l); },
  rotate(hex,deg){ const [h,s,l]=this.hexToHsl(hex); return this.hslToHex(h+deg,s,l); },
  contrastRatio(a,b){ const rl=(h)=>{ h=sanitizeHex(h); const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=> v<=0.03928? v/12.92: Math.pow((v+0.055)/1.055,2.4)); return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]; }; const L1=rl(a), L2=rl(b); const br=Math.max(L1,L2), dr=Math.min(L1,L2); return (br+0.05)/(dr+0.05); },
  bestTextOn(bg){ return this.contrastRatio(bg,'#000000')>=4.5 ? '#000000' : '#ffffff'; }
};

// -------- Harmonies & recommandations --------
const Harmonies={
  build(base,mode){ base=sanitizeHex(base); const [h,s,l]=Color.hexToHsl(base); const mk=(hh,ss=s,ll=l)=>Color.hslToHex(hh,clamp(ss,0,100),clamp(ll,0,100));
    const map={
      complementary:{primary:base, secondary:mk(h+180), accent:mk(h+30), neutral:mk(h,8,50)},
      analogous:{primary:base, secondary:mk(h-30), accent:mk(h+30), neutral:mk(h,8,50)},
      triadic:{primary:base, secondary:mk(h+120), accent:mk(h+240), neutral:mk(h,8,50)},
      monochrome:{primary:base, secondary:mk(h, Math.max(0,s-20), Math.min(100,l+10)), accent:mk(h, Math.min(100,s+15), Math.max(0,l-10)), neutral:mk(h,6,50)}
    };
    return map[mode]||map.complementary;
  },
  recommend(base){
    const [h,s,l]=Color.hexToHsl(base);
    return [
      Harmonies.build(base,'complementary'),
      Harmonies.build(Color.rotate(base,15),'analogous'),
      Harmonies.build(Color.rotate(base,-15),'analogous'),
      Harmonies.build(Color.saturate(base,10),'triadic'),
      Harmonies.build(Color.lighten(base,5),'monochrome')
    ];
  }
};

// -------- Tokens --------
function buildTokens(baseSet){
  const mk=(hex,isDark=false)=>{ const base=sanitizeHex(hex); const hover=isDark? Color.lighten(base,8): Color.lighten(base,-6); const active=isDark? Color.lighten(base,-6): Color.lighten(base,-12); const border=Color.lighten(base,-20); const text=Color.bestTextOn(base); return { base, hover, active, border, text }; };
  const light={ background:'#ffffff', surface:'#ffffff', overlay:'rgba(0,0,0,.5)', border:'#e5e7eb', focus:'#3b82f6', text:{primary:'#111827', secondary:'#374151', inverse:'#ffffff'}, colors:{ primary:mk(baseSet.primary), secondary:mk(baseSet.secondary), accent:mk(baseSet.accent), success:mk('#10b981'), warning:mk('#f59e0b'), danger:mk('#ef4444'), info:mk('#3b82f6'), neutral:mk(baseSet.neutral) } };
  const dark={ background:'#0b1220', surface:'#111827', overlay:'rgba(0,0,0,.6)', border:'#374151', focus:'#60a5fa', text:{primary:'#f9fafb', secondary:'#d1d5db', inverse:'#111827'}, colors:{ primary:mk(baseSet.primary,true), secondary:mk(baseSet.secondary,true), accent:mk(baseSet.accent,true), success:mk('#10b981',true), warning:mk('#f59e0b',true), danger:mk('#ef4444',true), info:mk('#60a5fa',true), neutral:mk(baseSet.neutral,true) } };
  return {light,dark};
}

function tokensToCSSVars(tokens){
  const as=(t)=>{
    const L=[]; L.push(`--color-bg:${t.background};`,`--color-surface:${t.surface};`,`--color-overlay:${t.overlay};`,`--color-border:${t.border};`,`--color-focus:${t.focus};`,`--color-text:${t.text.primary};`,`--color-text-muted:${t.text.secondary};`,`--color-text-inverse:${t.text.inverse};`);
    const add=(name,o)=>{ L.push(`--color-${name}:${o.base};`,`--color-${name}-hover:${o.hover};`,`--color-${name}-active:${o.active};`,`--color-${name}-border:${o.border};`,`--color-${name}-text:${o.text};`); };
    Object.entries(t.colors).forEach(([k,v])=>add(k,v)); return L.join('\n  ');
  };
  return `:root{\n  ${as(tokens.light)}\n}\n.dark{\n  ${as(tokens.dark)}\n}`;
}

// -------- Extraction d'image (K-Means simple) --------
function extractPaletteFromImage(img, k=6){
  const canvas=document.createElement('canvas'); const ctx=canvas.getContext('2d');
  const maxW=320; const ratio=img.width/img.height; canvas.width=Math.min(maxW,img.width); canvas.height=Math.round(canvas.width/ratio);
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
  const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
  const pixels=[]; for(let i=0;i<data.length;i+=4){ const r=data[i],g=data[i+1],b=data[i+2]; const a=data[i+3]; if(a<200) continue; pixels.push([r,g,b]); }
  if(pixels.length===0) return [];
  // Init centroids by sampling
  const centroids=[]; for(let i=0;i<k;i++){ const p=pixels[Math.floor(Math.random()*pixels.length)]; centroids.push(p.slice()); }
  const dist=(a,b)=> (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;
  for(let iter=0;iter<10;iter++){
    const clusters=Array.from({length:k},()=>({sum:[0,0,0],count:0}));
    for(const p of pixels){ let best=0; let bd=Infinity; for(let ci=0;ci<k;ci++){ const d=dist(p,centroids[ci]); if(d<bd){bd=d; best=ci;} } const c=clusters[best]; c.sum[0]+=p[0]; c.sum[1]+=p[1]; c.sum[2]+=p[2]; c.count++; }
    for(let ci=0;ci<k;ci++){ const c=clusters[ci]; if(c.count>0){ centroids[ci]=[c.sum[0]/c.count,c.sum[1]/c.count,c.sum[2]/c.count]; } }
  }
  const toHex=(rgb)=> '#'+rgb.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
  // Sort by frequency
  const counts=new Array(k).fill(0); for(const p of pixels){ let best=0; let bd=Infinity; for(let ci=0;ci<k;ci++){ const d=dist(p,centroids[ci]); if(d<bd){bd=d; best=ci;} } counts[best]++; }
  return centroids.map((c,i)=>({hex:toHex(c), count:counts[i]})).sort((a,b)=>b.count-a.count).map(x=>x.hex);
}

// -------- App --------
function App(){
  const [darkMode,setDarkMode]=useState(false);
  const [activeTab,setActiveTab]=useState('config'); // config | visual | export
  const [mode,setMode]=useState('complementary');
  const [baseColor,setBaseColor]=useState('#dc2626');
  const [tokens,setTokens]=useState(()=>buildTokens(Harmonies.build('#dc2626','complementary')));
  const [editingTheme,setEditingTheme]=useState('light');
  const [extracted,setExtracted]=useState([]);
  const [exportPreview,setExportPreview]=useState('');
  const fileInputRef=useRef(null);

  useEffect(()=>{ document.documentElement.classList.toggle('dark',darkMode); },[darkMode]);
  useEffect(()=>{ document.getElementById('crimson-theme').textContent=tokensToCSSVars(tokens); },[tokens]);

  const regenerate=()=>{ const set=Harmonies.build(baseColor,mode); setTokens(buildTokens(set)); };
  const randomizeBase=()=>{ const rand= '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0'); setBaseColor(rand); };
  const applyRecommendation=(rec)=>{ setTokens(buildTokens(rec)); };
  const recommendations=useMemo(()=> Harmonies.recommend(baseColor),[baseColor]);

  const updateRole=(theme, role, value)=>{
    value=sanitizeHex(value);
    setTokens(prev=>{
      const t=structuredClone(prev);
      if (role in t[theme].colors) {
        const text=Color.bestTextOn(value);
        t[theme].colors[role].base=value;
        t[theme].colors[role].hover = Color.lighten(value, theme==='dark'?8:-6);
        t[theme].colors[role].active = Color.lighten(value, theme==='dark'?-6:-12);
        t[theme].colors[role].border = Color.lighten(value, -20);
        t[theme].colors[role].text = text;
      } else if (role.startsWith('text.')) {
        const key=role.split('.')[1]; t[theme].text[key]=value;
      } else if (['background','surface','border','overlay','focus'].includes(role)){
        t[theme][role]=value;
      }
      return t;
    });
  };

  const onPickImage=(e)=>{
    const file=e.target.files?.[0]; if(!file) return;
    const reader=new FileReader(); reader.onload=(ev)=>{ const img=new Image(); img.onload=()=>{ const colors=extractPaletteFromImage(img,6); setExtracted(colors); }; img.src=ev.target.result; };
    reader.readAsDataURL(file);
  };

  const exportData=(format)=>{
    let data='';
    if (format==='css') data=tokensToCSSVars(tokens);
    if (format==='json') data=JSON.stringify(tokens,null,2);
    if (format==='scss') data=tokensToScss(tokens);
    if (format==='tailwind') data=tokensToTailwind(tokens);
    if (format==='xaml') data=tokensToXaml(tokens);
    setExportPreview(data);
    const blob=new Blob([data],{type:'text/plain'}); const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=`crimson.${format==='json'?'json':format==='xaml'?'xaml':'txt'}`; a.click(); URL.revokeObjectURL(url);
  };
  const copyExport=()=>{ navigator.clipboard?.writeText(exportPreview); };

  const tokensToScss=(t)=>{
    const L=[]; const add=(prefix,obj)=>{ Object.entries(obj).forEach(([k,v])=>{ if (typeof v==='string') { L.push(`$${prefix}-${k}: ${v};`); } else if (typeof v==='object') { add(`${prefix}-${k}`.replace(/\./g,'-'), v); } }); };
    add('light', t.light); add('dark', t.dark); return L.join('\n');
  };
  const tokensToTailwind=(t)=>{
    const colors={}; Object.keys(t.light.colors).forEach(k=>{ colors[k]={ DEFAULT:t.light.colors[k].base, text:t.light.colors[k].text, hover:t.light.colors[k].hover, active:t.light.colors[k].active }; });
    return JSON.stringify({ theme:{ extend:{ colors } } }, null, 2);
  };
  const tokensToXaml=(t)=>{
    let xml = '<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">\n';
    const out=(themeName, obj, prefix)=>{
      Object.entries(obj).forEach(([k,v])=>{
        if (typeof v==='string') {
          xml += `  <Color x:Key="${themeName}-${prefix}${k}">${v}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}Brush" Color="${v}"/>\n`;
        } else if (typeof v==='object' && v.base && v.hover && v.active && v.border && v.text) {
          xml += `  <Color x:Key="${themeName}-${prefix}${k}">${v.base}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}Brush" Color="${v.base}"/>\n`;
          xml += `  <Color x:Key="${themeName}-${prefix}${k}-Hover">${v.hover}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}HoverBrush" Color="${v.hover}"/>\n`;
          xml += `  <Color x:Key="${themeName}-${prefix}${k}-Active">${v.active}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}ActiveBrush" Color="${v.active}"/>\n`;
          xml += `  <Color x:Key="${themeName}-${prefix}${k}-Border">${v.border}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}BorderBrush" Color="${v.border}"/>\n`;
          xml += `  <Color x:Key="${themeName}-${prefix}${k}-Text">${v.text}</Color>\n`;
          xml += `  <SolidColorBrush x:Key="${themeName}-${prefix}${k}TextBrush" Color="${v.text}"/>\n`;
        } else if (typeof v==='object') {
          out(themeName, v, `${prefix}${k}-`);
        }
      });
    };
    out('Light', t.light, ''); out('Dark', t.dark, ''); xml += '</ResourceDictionary>';
    return xml;
  };

  // ----- UI Components -----
  const RoleEditor = ({theme, role, label})=>{
    const c = role.startsWith('text.') ? tokens[theme].text[role.split('.')[1]] : (tokens[theme].colors[role]?.base || tokens[theme][role]);
    const textColor = role.startsWith('text.') ? '#000000' : (tokens[theme].colors[role]?.text || tokens[theme].text.primary);
    const contrast = Color.contrastRatio(c, role.startsWith('text.')? '#ffffff' : textColor);
    const level = contrast>=7?'AAA':contrast>=4.5?'AA':'Fail';
    return (
      <div className="flex items-center gap-3 p-2 rounded border border-[var(--color-border)]">
        <div className="w-32 text-sm">{label}</div>
        <div className="flex items-center gap-2">
          <input type="color" value={c} onChange={e=>updateRole(theme, role, e.target.value)} className="w-10 h-10 rounded border" />
          <input type="text" value={c} onChange={e=>updateRole(theme, role, e.target.value)} className="px-2 py-1 rounded border bg-white dark:bg-gray-800 w-36" />
        </div>
        <span className={`text-xs px-2 py-1 rounded ${level==='AAA'?'bg-green-100 text-green-800': level==='AA'?'bg-yellow-100 text-yellow-800':'bg-red-100 text-red-800'}`}>{level}</span>
        {extracted.length>0 && !role.startsWith('text.') && (
          <select onChange={e=>updateRole(theme, role, e.target.value)} className="ml-auto px-2 py-1 rounded border bg-white dark:bg-gray-800">
            <option>Depuis image…</option>
            {extracted.map(hex=> <option key={hex} value={hex}>{hex}</option>)}
          </select>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <h1 className="font-bold" style={{color:'var(--color-primary)'}}>Crimson</h1>
            <span className="text-sm text-[var(--color-text-muted)]">Créateur intelligent de palette UI</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setActiveTab('config')} className={`px-3 py-1 rounded border ${activeTab==='config'?'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[var(--color-border)]'}`}>Configuration</button>
            <button onClick={()=>setActiveTab('visual')} className={`px-3 py-1 rounded border ${activeTab==='visual'?'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[var(--color-border)]'}`}>Visualisation</button>
            <button onClick={()=>setActiveTab('export')} className={`px-3 py-1 rounded border ${activeTab==='export'?'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[var(--color-border)]'}`}>Export</button>
            <button onClick={()=>setDarkMode(v=>!v)} className="px-2 py-1 rounded border border-[var(--color-border)]">{darkMode?'☀️':'🌙'}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab==='config' && (
          <div className="grid gap-6">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Base & Harmonisation</h2>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <div className="text-sm mb-1">Couleur de base</div>
                  <div className="flex items-center gap-2">
                    <input type="color" value={baseColor} onChange={e=>setBaseColor(e.target.value)} className="w-12 h-12 rounded border" />
                    <input type="text" value={baseColor} onChange={e=>setBaseColor(e.target.value)} className="px-2 py-2 rounded border bg-white dark:bg-gray-800 w-36" />
                  </div>
                </div>
                <div>
                  <div className="text-sm mb-1">Mode</div>
                  <select value={mode} onChange={e=>setMode(e.target.value)} className="px-3 py-2 rounded border bg-white dark:bg-gray-800">
                    <option value="complementary">Complémentaire</option>
                    <option value="analogous">Analogue</option>
                    <option value="triadic">Triadique</option>
                    <option value="monochrome">Monochrome</option>
                  </select>
                </div>
                <div className="ml-auto flex gap-2">
                  <button onClick={randomizeBase} className="px-3 py-2 rounded border">Aléatoire</button>
                  <button onClick={regenerate} className="px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--color-primary-text)]">Générer</button>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm mb-2">Suggestions</div>
                <div className="flex flex-wrap gap-2">
                  {recommendations.map((rec,i)=> (
                    <button key={i} onClick={()=>applyRecommendation(rec)} className="px-3 py-2 rounded border" style={{borderColor:rec.primary}}>
                      <span className="inline-flex -space-x-1">
                        {[rec.primary, rec.secondary, rec.accent].map((c,idx)=> <span key={idx} className="w-3 h-3 rounded-full inline-block" style={{background:c, border:'1px solid rgba(0,0,0,.1)'}}/>) }
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Rôles & Tokens</h2>
                <div className="flex gap-2">
                  <button onClick={()=>setEditingTheme('light')} className={`px-3 py-1 rounded border ${editingTheme==='light'?'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[var(--color-border)]'}`}>Light</button>
                  <button onClick={()=>setEditingTheme('dark')} className={`px-3 py-1 rounded border ${editingTheme==='dark'?'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[var(--color-border)]'}`}>Dark</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Surfaces & Textes */}
                <RoleEditor theme={editingTheme} role="background" label="Background" />
                <RoleEditor theme={editingTheme} role="surface" label="Surface" />
                <RoleEditor theme={editingTheme} role="border" label="Border" />
                <RoleEditor theme={editingTheme} role="focus" label="Focus" />
                <RoleEditor theme={editingTheme} role="text.primary" label="Text/Primary" />
                <RoleEditor theme={editingTheme} role="text.secondary" label="Text/Secondary" />
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {['primary','secondary','accent','success','warning','danger','info','neutral'].map(key=> (
                  <div key={key} className="rounded border p-3 border-[var(--color-border)]">
                    <div className="font-medium mb-2 capitalize">{key}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <RoleEditor theme={editingTheme} role={`${key}`} label="Base" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Extraction d’image</h2>
              <div className="flex items-center gap-3">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={onPickImage} className="hidden" />
                <button onClick={()=>fileInputRef.current?.click()} className="px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--color-primary-text)]">Choisir une image</button>
                {extracted.length>0 && <span className="text-sm text-[var(--color-text-muted)]">{extracted.length} couleurs extraites</span>}
              </div>
              {extracted.length>0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {extracted.map(hex=> (
                    <div key={hex} className="rounded border w-10 h-10" title={hex} style={{background:hex, borderColor:'var(--color-border)'}} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab==='visual' && (
          <div className="grid gap-6">
            <div className="rounded-lg overflow-hidden border border-[var(--color-border)]">
              <div className="px-4 py-3" style={{background:'var(--color-primary)', color:'var(--color-primary-text)'}}>Header de l’application</div>
              <div className="grid grid-cols-12">
                <aside className="col-span-3 border-r border-[var(--color-border)] p-4" style={{background:'var(--color-surface)'}}>
                  <div className="font-medium mb-3">Navigation</div>
                  <ul className="space-y-2 text-sm">
                    <li className="text-[var(--color-text-muted)]">Dashboard</li>
                    <li className="text-[var(--color-text-muted)]">Projets</li>
                    <li className="text-[var(--color-text-muted)]">Paramètres</li>
                  </ul>
                </aside>
                <section className="col-span-9 p-4" style={{background:'var(--color-bg)'}}>
                  <div className="flex items-center gap-2 mb-4">
                    <button className="px-3 py-2 rounded" style={{background:'var(--color-primary)', color:'var(--color-primary-text)'}}>Nouveau</button>
                    <button className="px-3 py-2 rounded border" style={{borderColor:'var(--color-border)'}}>Filtrer</button>
                    <span className="px-2 py-1 text-xs rounded" style={{background:'var(--color-accent)', color:'var(--color-accent-text)'}}>Badge</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[1,2,3,4,5,6].map(i=> (
                      <div key={i} className="rounded border p-4" style={{background:'var(--color-surface)', borderColor:'var(--color-border)'}}>
                        <div className="font-medium mb-1">Carte #{i}</div>
                        <div className="text-[var(--color-text-muted)] mb-3">Texte descriptif court.</div>
                        <button className="px-3 py-1 rounded" style={{background:'var(--color-secondary)', color:'var(--color-secondary-text)'}}>Action</button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="font-medium mb-2">Formulaire</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input placeholder="Nom" className="px-3 py-2 rounded border" style={{background:'var(--color-surface)', borderColor:'var(--color-border)'}} />
                      <input placeholder="Email" className="px-3 py-2 rounded border" style={{background:'var(--color-surface)', borderColor:'var(--color-border)'}} />
                      <select className="px-3 py-2 rounded border" style={{background:'var(--color-surface)', borderColor:'var(--color-border)'}}>
                        <option>Choisir…</option>
                      </select>
                      <button className="px-4 py-2 rounded" style={{background:'var(--color-success)', color:'var(--color-success-text)'}}>Envoyer</button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {activeTab==='export' && (
          <div className="grid gap-6">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Exporter</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[{format:'css',name:'CSS Variables'},{format:'scss',name:'SCSS Variables'},{format:'json',name:'JSON Tokens'},{format:'tailwind',name:'Tailwind Config'},{format:'xaml',name:'XAML (WinUI/WPF)'}].map(it=> (
                  <button key={it.format} onClick={()=>exportData(it.format)} className="p-4 rounded border border-[var(--color-border)] text-left hover:bg-[var(--color-bg)]">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Cliquez pour télécharger</div>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-[var(--color-text-muted)]">Aperçu du dernier export</div>
                  <button onClick={copyExport} className="px-3 py-1 rounded border">Copier</button>
                </div>
                <textarea value={exportPreview} onChange={()=>{}} className="w-full h-64 p-3 rounded border" style={{background:'var(--color-bg)', borderColor:'var(--color-border)'}} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
