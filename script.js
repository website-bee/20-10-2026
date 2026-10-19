/* Artwork and the downloadable card are generated locally; music uses music.mp3.
   No build step, framework, image files or API keys are needed. */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const delay = ms => new Promise(resolve => setTimeout(resolve, reduceMotion.matches ? Math.min(ms, 120) : ms));
  const svgOpen = viewBox => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" aria-hidden="true">`;
  const escapeXML = value => String(value).replace(/[<>&"']/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[ch]));

  // Bézier petals, translucent edges and layered gradients give the flowers depth.
  const floralDefs = `
    <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b7c69d"/><stop offset=".5" stop-color="#8d9e78"/><stop offset="1" stop-color="#657f67"/></linearGradient>
    <linearGradient id="leaf-light"><stop stop-color="#d4d9ba"/><stop offset="1" stop-color="#9dae8c"/></linearGradient>
    <linearGradient id="pink-petal" x1=".1" y1="0" x2=".75" y2="1"><stop stop-color="#f8d7de"/><stop offset=".42" stop-color="#e9adbd"/><stop offset="1" stop-color="#b96986"/></linearGradient>
    <linearGradient id="rose-petal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5cad3"/><stop offset=".5" stop-color="#d68ca3"/><stop offset="1" stop-color="#a85778"/></linearGradient>
    <linearGradient id="rose-light" x1=".2" y1="0" x2=".7" y2="1"><stop stop-color="#fff0ec"/><stop offset=".4" stop-color="#edbec9"/><stop offset="1" stop-color="#cf8ca3"/></linearGradient>
    <linearGradient id="rose-deep" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#db9fb4"/><stop offset="1" stop-color="#99516f"/></linearGradient>
    <linearGradient id="tulip-back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eeb2c2"/><stop offset="1" stop-color="#b76787"/></linearGradient>
    <linearGradient id="tulip-front" x1="0" y1=".1" x2="1" y2="1"><stop stop-color="#ffe6e5"/><stop offset=".42" stop-color="#f2bccc"/><stop offset="1" stop-color="#c87998"/></linearGradient>
    <linearGradient id="paper-wrap" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8ede0"/><stop offset=".5" stop-color="#ede0cb"/><stop offset="1" stop-color="#d4c3a7"/></linearGradient>
    <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d6a1b0"/><stop offset=".5" stop-color="#ba7d92"/><stop offset="1" stop-color="#965970"/></linearGradient>
    <radialGradient id="daisy-core"><stop stop-color="#c99b53"/><stop offset=".7" stop-color="#dcc186"/><stop offset="1" stop-color="#b89e66"/></radialGradient>
    <symbol id="flower-rose" viewBox="0 0 200 180">
      <path d="M97 158C75 177 48 153 30 135 9 133 3 108 18 89 4 67 21 46 43 45 44 18 79 9 100 28 124 8 151 21 156 44 181 45 197 66 182 88 198 110 183 137 163 137 145 164 119 172 97 158Z" fill="url(#rose-light)"/>
      <path d="M102 151C70 167 36 135 30 109 13 94 36 67 56 61 49 37 84 24 103 46 120 26 153 41 150 65 175 70 181 104 160 118 153 144 126 160 102 151Z" fill="url(#pink-petal)"/>
      <path d="M99 146C65 139 39 117 49 86 39 73 41 53 58 47 65 88 88 83 99 110 114 85 143 74 149 49 172 68 161 95 149 112 135 139 121 144 99 146Z" fill="url(#rose-petal)"/>
      <path d="M37 111C53 125 76 122 99 146 71 145 48 139 37 111Z" fill="#f3c6d1" opacity=".8"/>
      <path d="M99 126C70 132 56 104 65 82 57 63 80 43 99 55 122 41 147 59 137 82 153 102 124 133 99 126Z" fill="url(#rose-light)"/>
      <path d="M64 82C81 79 102 94 99 124 77 111 69 105 64 82Z" fill="url(#rose-deep)"/>
      <path d="M135 78C137 103 119 120 99 124 97 104 113 86 135 78Z" fill="url(#pink-petal)"/>
      <path d="M99 108C76 115 70 86 83 77 81 58 109 53 118 74 137 82 119 110 99 108Z" fill="url(#rose-petal)"/>
      <path d="M81 77C98 66 115 75 118 92 105 83 94 86 99 108 89 102 84 90 81 77Z" fill="url(#rose-light)"/>
      <path d="M99 94C92 85 104 73 111 84 111 92 105 96 99 94Z" fill="#ad6684"/>
      <path d="M18 88C25 96 30 101 39 103M155 45C153 53 151 57 147 62M43 45C48 48 51 49 56 61M160 119C153 121 150 124 145 129" stroke="#fff0ec" opacity=".5" stroke-width="1.5" stroke-linecap="round"/>
    </symbol>
    <symbol id="flower-tulip" viewBox="0 0 180 180">
      <path d="M88 151C55 135 34 97 48 37 65 40 76 54 88 73 90 39 105 15 115 12 133 37 133 61 124 84 140 67 155 59 163 61 166 116 137 149 100 154Z" fill="url(#tulip-back)"/>
      <path d="M91 153C51 147 25 103 31 49 71 58 92 97 99 143 91 91 118 54 148 44 158 100 143 142 105 154Z" fill="url(#tulip-front)"/>
      <path d="M97 149C68 120 66 72 82 35 109 50 128 106 102 152Z" fill="url(#pink-petal)"/>
      <path d="M34 52C55 60 79 90 89 122M145 47C124 66 109 102 104 131M82 39C88 61 96 92 97 123" stroke="#fff0ee" stroke-opacity=".55" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M87 151 98 166 110 151" fill="#87a07b"/>
    </symbol>
    <symbol id="flower-daisy" viewBox="0 0 150 150">
      <g fill="#fffbef" stroke="#e8e0cc" stroke-width=".6">
        <path id="daisy-petal" d="M73 69C62 58 61 23 73 13 86 19 86 53 77 69Z"/>
        <use href="#daisy-petal" transform="rotate(30 75 75)"/><use href="#daisy-petal" transform="rotate(60 75 75)"/><use href="#daisy-petal" transform="rotate(90 75 75)"/><use href="#daisy-petal" transform="rotate(120 75 75)"/><use href="#daisy-petal" transform="rotate(150 75 75)"/><use href="#daisy-petal" transform="rotate(180 75 75)"/><use href="#daisy-petal" transform="rotate(210 75 75)"/><use href="#daisy-petal" transform="rotate(240 75 75)"/><use href="#daisy-petal" transform="rotate(270 75 75)"/><use href="#daisy-petal" transform="rotate(300 75 75)"/><use href="#daisy-petal" transform="rotate(330 75 75)"/>
      </g><circle cx="75" cy="75" r="16" fill="url(#daisy-core)"/><g fill="#a88c50" opacity=".65"><circle cx="71" cy="69" r="1.5"/><circle cx="79" cy="72" r="1.4"/><circle cx="68" cy="77" r="1.2"/><circle cx="77" cy="82" r="1.5"/><circle cx="82" cy="77" r="1.1"/><circle cx="74" cy="76" r="1.5"/></g>
    </symbol>
    <symbol id="botanical-branch" viewBox="0 0 260 390">
      <g stroke="#8b9c77" stroke-width="1.3" stroke-linecap="round"><path d="M95 385C148 283 83 199 165 35M118 298C69 264 59 237 43 200M118 255C173 225 187 193 203 151M119 200C78 170 74 131 70 103M137 128C173 102 190 77 199 45"/></g>
      <g fill="url(#leaf-light)"><path d="M112 301C75 298 59 275 61 255 87 254 105 278 112 301Z"/><path d="M88 274C53 266 37 242 43 224 72 229 80 251 88 274Z"/><path d="M66 239C40 238 22 218 26 197 51 200 59 220 66 239Z"/><path d="M121 253C128 219 150 204 171 208 166 235 141 246 121 253Z"/><path d="M158 227C164 193 182 177 204 180 199 205 178 217 158 227Z"/><path d="M190 185C186 157 197 137 218 130 225 155 205 176 190 185Z"/><path d="M119 201C90 191 73 167 80 145 106 151 116 179 119 201Z"/><path d="M91 165C65 155 52 132 58 111 80 117 90 142 91 165Z"/><path d="M136 130C138 98 160 83 177 89 173 111 154 123 136 130Z"/><path d="M169 101C167 70 183 52 200 54 201 78 180 95 169 101Z"/><path d="M152 72C131 55 137 28 152 17 164 34 160 53 152 72Z"/><path d="M165 37C165 18 182 6 194 10 192 25 177 35 165 37Z"/></g>
      <g fill="url(#leaf)" opacity=".65"><path d="M112 328C141 295 169 292 179 301 167 323 143 333 112 328Z"/><path d="M100 284C88 252 99 236 115 232 126 250 111 272 100 284Z"/><path d="M124 174C144 142 168 138 180 146 167 164 144 171 124 174Z"/></g>
    </symbol>`;
  $('#floral-defs').innerHTML = floralDefs;

  function bouquetMarkup() {
    return `<g stroke="#80916e" stroke-width="3" stroke-linecap="round"><path d="M210 433 119 153M210 433 262 112M210 433 328 187M210 433 186 92M210 433 84 209M210 433 283 224M210 433 161 216"/></g>
      <g fill="url(#leaf)"><path d="M195 323C124 312 72 261 88 230 148 241 179 282 195 323Z"/><path d="M228 314C230 255 276 209 309 218 299 271 259 297 228 314Z"/><path d="M146 234C91 230 59 188 70 159 108 173 131 203 146 234Z"/><path d="M262 234C265 186 303 147 328 157 319 198 289 225 262 234Z"/><path d="M202 179C161 149 156 103 179 85 205 112 208 151 202 179Z"/></g>
      <g opacity=".8"><use href="#botanical-branch" x="11" y="70" width="170" height="300" transform="rotate(-22 100 280)"/><use href="#botanical-branch" x="238" y="85" width="135" height="285" transform="rotate(23 280 300)"/></g>
      <g class="bouquet-flower" style="--flower-delay:.08s"><use href="#flower-tulip" x="205" y="38" width="128" height="145" transform="rotate(18 269 125)"/></g>
      <g class="bouquet-flower" style="--flower-delay:.2s"><use href="#flower-tulip" x="52" y="110" width="120" height="145" transform="rotate(-24 112 190)"/></g>
      <g class="bouquet-flower" style="--flower-delay:.35s"><use href="#flower-rose" x="110" y="55" width="153" height="145" transform="rotate(-8 185 120)"/></g>
      <g class="bouquet-flower" style="--flower-delay:.48s"><use href="#flower-rose" x="204" y="139" width="147" height="132" transform="rotate(12 277 205)"/></g>
      <g class="bouquet-flower" style="--flower-delay:.6s"><use href="#flower-rose" x="105" y="166" width="145" height="137"/></g>
      <g class="bouquet-flower" style="--flower-delay:.72s"><use href="#flower-daisy" x="59" y="194" width="87" height="87"/><use href="#flower-daisy" x="286" y="103" width="73" height="73"/><use href="#flower-daisy" x="216" y="224" width="70" height="70"/></g>
      <g fill="#fffaf1" stroke="#d5ccb8" stroke-width=".6"><path d="m89 135-4-7-4 7-7 3 6 5 1 8 7-4 7 1-1-8 4-5Z"/><path d="m333 219-3-5-4 5-5 1 3 4-1 6 6-1 4 3 1-6 4-3Z"/><path d="m143 70-3-5-3 5-5 1 3 4v6l5-2 4 3 1-5 4-4Z"/></g>
      <path d="M101 271 216 311 320 272 257 429 207 462 153 422Z" fill="url(#paper-wrap)"/>
      <path d="m101 271 115 40-9 151-54-40Z" fill="#f6eddd" opacity=".88"/><path d="m320 272-104 39-9 151 50-33Z" fill="#dfcfb6" opacity=".6"/>
      <path d="m111 278 96 58 103-57M207 336v111" stroke="#fff9ec" stroke-opacity=".7" stroke-width="1.3"/>
      <path d="M165 383q49-12 91 0l-5 18q-45-10-82 0Z" fill="url(#ribbon)"/>
      <path d="M208 391c-80-67-86 30-8 11-45 15-33 33-45 51 26-5 46-31 53-54 4 21 27 46 52 47-13-17-8-31-41-45 79 20 68-67-11-10Z" fill="url(#ribbon)" stroke="#b88194" stroke-width="1"/>
      <path d="M202 391c-59-41-66 12-6 7M217 392c55-42 62 11 5 6" stroke="#edc5cf" stroke-width="3" opacity=".65"/>
      <ellipse cx="210" cy="396" rx="12" ry="10" fill="#c08a9e"/>`;
  }

  function art(type) {
    if (type === 'branch') return svgOpen('0 0 260 390') + '<use href="#botanical-branch" width="260" height="390"/></svg>';
    if (type === 'bouquet' || type === 'mini-bouquet') return svgOpen('0 0 420 500') + bouquetMarkup() + '</svg>';
    const head = type === 'rose' ? '<use href="#flower-rose" x="0" y="5" width="180" height="162"/>' : type === 'daisy' ? '<use href="#flower-daisy" x="15" y="8" width="150" height="150"/>' : '<use href="#flower-tulip" x="0" y="0" width="180" height="180"/>';
    return svgOpen('0 0 180 290') + '<path d="M92 282Q77 227 94 137" stroke="#839875" stroke-width="3"/><path d="M88 244C47 244 36 216 39 203c31 0 43 26 49 41ZM88 215c35-2 53-24 48-43-30 3-44 27-48 43Z" fill="url(#leaf)"/>' + head + '</svg>';
  }
  $$('[data-art]').forEach(el => { el.innerHTML = art(el.dataset.art); });

  // Floating SVG flowers occupy different perspective planes around the gift.
  const flowerHead = (type, extra = '') => svgOpen('0 0 200 180') + `<use href="#flower-${type}" width="200" height="180" ${extra}/></svg>`;
  const floatingPositions = [[4,18,108,-22],[87,14,100,24],[1,61,133,15],[90,66,120,-18],[12,83,70,-10],[78,84,74,20],[11,37,60,28],[82,42,66,-25],[24,5,44,12],[69,6,48,-16]];
  floatingPositions.forEach(([x,y,size,rotation], index) => {
    const flower = document.createElement('span'); flower.className = 'floating-flower';
    flower.style.cssText = `--garden-x:${x}%;--garden-y:${y}%;--garden-size:${size}px;--garden-turn:${rotation}deg;--garden-delay:${-index * 1.13}s;--garden-duration:${7 + index % 4}s;--garden-hue:${index % 3 === 0 ? -20 : index % 3 === 1 ? 14 : 0}deg`;
    flower.innerHTML = flowerHead(['rose','tulip','daisy'][index % 3]); $('#floating-garden').appendChild(flower);
  });
  for (let index = 0; index < 18; index++) {
    const petal = document.createElement('span'); petal.className = 'rain-petal';
    petal.style.cssText = `--rain-x:${(index * 37 + 9) % 100}%;--rain-delay:${-index * 1.8}s;--rain-duration:${13 + index % 7}s;--rain-size:${7 + index % 5 * 2}px;--rain-turn:${index * 31}deg;--rain-drift:${index % 2 ? 100 : -90}px`;
    $('#petal-rain').appendChild(petal);
  }
  const wishPositions = [[14,17],[39,4],[66,10],[88,25],[97,51],[87,78],[64,94],[35,92],[10,77],[1,47]];
  wishPositions.forEach(([x,y], index) => {
    const flower = document.createElement('span'); flower.className = 'wish-flower';
    flower.style.cssText = `--wish-x:${x}%;--wish-y:${y}%;--wish-turn:${index * 29 - 30}deg;--wish-delay:${index * -.7}s`;
    flower.innerHTML = flowerHead(['rose','tulip','daisy','rose'][index % 4]); $('#wish-garden').appendChild(flower);
  });

  // Real CSS 3D geometry: 36 individually curved petal planes, in three depth rings.
  const sculpture = document.createElement('span'); sculpture.className = 'rose3d';
  [{count:16,width:76,height:118,radius:25,z:0,tilt:12},{count:12,width:63,height:95,radius:13,z:19,tilt:27},{count:8,width:48,height:74,radius:2,z:34,tilt:41}].forEach((ring, ringIndex) => {
    for (let i = 0; i < ring.count; i++) {
      const petal = document.createElement('span'); petal.className = `rose-petal rose-ring-${ringIndex}`;
      petal.style.cssText = `--petal-angle:${i * 360 / ring.count + ringIndex * 16}deg;--petal-width:${ring.width}px;--petal-height:${ring.height}px;--petal-radius:${ring.radius}px;--petal-depth:${ring.z}px;--petal-tilt:${ring.tilt}deg;--petal-delay:${ringIndex * .18 + i * .035}s;--petal-hue:${i % 4 * 3}deg`;
      sculpture.appendChild(petal);
    }
  });
  const core = document.createElement('span'); core.className = 'rose-core'; sculpture.appendChild(core);
  $('#flower-sculpture').appendChild(sculpture);
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('.bloom-button, .intro-envelope-wrap, .gift-button').forEach(element => {
      element.addEventListener('pointermove', event => {
        if (reduceMotion.matches) return;
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--tilt-x', `${((event.clientX - rect.left) / rect.width - .5) * 24}deg`);
        element.style.setProperty('--tilt-y', `${-((event.clientY - rect.top) / rect.height - .5) * 16}deg`);
      }, {passive:true});
      element.addEventListener('pointerleave', () => { element.style.setProperty('--tilt-x','0deg'); element.style.setProperty('--tilt-y','0deg'); });
    });
  }
  $('#bloom-art').innerHTML = svgOpen('0 0 300 340') + `
    <g class="bloom-stem-group"><path d="M150 325C141 268 167 210 150 139" stroke="#7d946e" stroke-width="4" stroke-linecap="round"/>
    <path class="bloom-leaf" d="M151 260C102 253 73 211 78 176 113 192 140 216 151 260Z" fill="url(#leaf)"/><path d="M154 232C157 183 186 153 203 150 208 185 188 218 154 232Z" fill="url(#leaf-light)"/>
    <path d="M151 260q-36-41-66-74M154 232q14-43 43-74" stroke="#d1dabb" stroke-width="1" opacity=".6"/>
    <g class="bloom-petal bloom-left-outer" style="--delay:.25s"><path d="M151 157C99 156 48 113 43 59 43 45 59 50 75 53 116 57 146 106 151 157Z" fill="url(#tulip-front)"/><path d="M48 54c26 16 65 53 91 91" stroke="#ffefed" stroke-opacity=".6" stroke-width="1"/></g>
    <g class="bloom-petal bloom-right-outer" style="--delay:.42s"><path d="M150 157C202 156 252 111 257 57 257 43 240 47 225 52 184 59 155 105 150 157Z" fill="url(#pink-petal)"/><path d="M252 52c-28 15-66 55-90 92" stroke="#fff0ee" stroke-opacity=".5" stroke-width="1"/></g>
    <g class="bloom-petal bloom-left-mid" style="--delay:.12s"><path d="M151 154C106 143 73 90 83 31 85 20 104 31 116 40 144 62 160 113 151 154Z" fill="url(#rose-petal)"/><path d="M88 29q38 54 59 112" stroke="#ffdfe7" stroke-opacity=".55"/></g>
    <g class="bloom-petal bloom-right-mid" style="--delay:.3s"><path d="M149 154C193 145 225 91 218 32 217 18 198 29 185 39 159 60 140 111 149 154Z" fill="url(#tulip-front)"/><path d="M212 29q-38 54-58 111" stroke="#fff1ed" stroke-opacity=".6"/></g>
    <g class="bloom-petal bloom-center"><path d="M150 156C120 127 115 62 146 14 149 9 154 10 157 15 188 65 182 125 150 156Z" fill="url(#pink-petal)"/><path d="M151 19q-11 69 0 129" stroke="#ffebe9" stroke-opacity=".55" stroke-width="1.2"/></g>
    <path d="m136 150 14 18 16-19-16 8Z" fill="#809b72"/></g></svg>`;

  // A single, bounded canvas handles all petals, hearts, stars and confetti.
  const canvas = $('#petals');
  const ctx = canvas.getContext('2d');
  const particles = [];
  let canvasWidth = innerWidth, canvasHeight = innerHeight, particleFrame = 0, lastFrame = 0;
  function resizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvasWidth = innerWidth; canvasHeight = innerHeight;
    canvas.width = canvasWidth * dpr; canvas.height = canvasHeight * dpr;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  addEventListener('resize', resizeCanvas, { passive: true });
  const particleColors = ['#e36dac', '#bc79d4', '#ffc3d8', '#9abf9c', '#e7bf72', '#f7a69f'];
  function burst(element, kind = 'petal', amount = 30) {
    if (!ctx || reduceMotion.matches || document.hidden) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2, y = rect.top + rect.height * .4;
    for (let i = 0; i < amount && particles.length < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push({ x, y, vx: Math.cos(angle) * (1 + Math.random() * 3.8), vy: Math.sin(angle) * 2.5 - 3.5, size: 3 + Math.random() * 6, rotate: Math.random() * Math.PI, spin: (Math.random() - .5) * .1, age: 0, life: 100 + Math.random() * 45, color: particleColors[Math.floor(Math.random() * particleColors.length)], kind: kind === 'mixed' ? ['petal', 'heart', 'star'][i % 3] : kind });
    }
    if (!particleFrame) { lastFrame = 0; particleFrame = requestAnimationFrame(drawParticles); }
  }
  function drawParticles(time) {
    if (document.hidden) { particles.length = 0; particleFrame = 0; ctx.clearRect(0, 0, canvasWidth, canvasHeight); return; }
    const dt = lastFrame ? Math.min((time - lastFrame) / 16.67, 2) : 1;
    lastFrame = time;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]; p.age += dt;
      if (p.age > p.life) { particles.splice(i, 1); continue; }
      p.x += (p.vx + Math.sin(p.age * .04) * .5) * dt; p.y += p.vy * dt; p.vy += .035 * dt; p.rotate += p.spin * dt;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotate); ctx.globalAlpha = Math.min(1, (p.life - p.age) / 30) * .8; ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.kind === 'heart') { ctx.moveTo(0, p.size * .6); ctx.bezierCurveTo(-p.size * 1.5, -p.size * .1, -p.size * .6, -p.size, 0, -p.size * .35); ctx.bezierCurveTo(p.size * .6, -p.size, p.size * 1.5, -p.size * .1, 0, p.size * .6); }
      else if (p.kind === 'star') { for (let n = 0; n < 8; n++) { const a = n * Math.PI / 4; const r = n % 2 ? p.size * .25 : p.size; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } }
      else if (p.kind === 'confetti') { ctx.rect(-p.size / 2, -p.size / 3, p.size, p.size * .55); }
      else { ctx.moveTo(-p.size, 0); ctx.bezierCurveTo(-p.size, -p.size, p.size * .9, -p.size * .8, p.size, 0); ctx.bezierCurveTo(p.size * .5, p.size * .8, -p.size * .1, p.size * .7, -p.size, 0); }
      ctx.fill(); ctx.restore();
    }
    particleFrame = particles.length ? requestAnimationFrame(drawParticles) : 0;
  }

  const scenes = $$('.scene'), steps = $$('.step');
  const completed = [false, false, false, false, false, true];
  let currentSlide = 0, selectedStudent = null, busy = false, transitioning = false, openingGift = false;
  let dateTapCount = 0;
  let letterRead = false;
  const littleWishes = ['Chúc bạn luôn vui vẻ.', 'Chúc bạn luôn khỏe mạnh.', 'Chúc bạn học tập tốt.', 'Chúc bạn thi cử suôn sẻ.', 'Chúc bạn gặp nhiều may mắn.', 'Chúc bạn có thêm nhiều bạn tốt.', 'Chúc bạn làm được điều mình thích.', 'Chúc bạn có nhiều chuyến đi vui.', 'Chúc bạn nhận được nhiều hoa và quà.', 'Chúc bạn ngày 20/10 thật vui!'];
  const titles = ['Quà 20/10 của lớp', 'Chúc mừng 20/10', 'Hoa tặng bạn', 'Thêm một món quà', 'Lời chúc của lớp', 'Thiệp 20/10'];
  const defaultPageTitle = document.title;
  const senderCopy = [
    ['.wordmark i', 'gửi bạn tôi.'],
    ['.wordmark small', 'LÂM ĐẸP ZAI'],
    ['.occasion', '20.10 — GỬI RIÊNG BẠN TÔI'],
    ['.intro-subtitle', 'Món quà nhỏ do Lâm đẹp zai làm, gửi riêng bạn tôi :))'],
    ['#intro-envelope .envelope-address', 'Gửi bạn tôi'],
    ['#date-message', 'Lâm chúc bạn tôi một ngày 20/10 thật vui!'],
    ['.letter-paper-bottom > span:first-child', 'Lâm đẹp zai.'],
    ['.finale-recipient + p', 'Chúc bạn tôi luôn vui vẻ, khỏe mạnh, học tốt và gặp nhiều may mắn.'],
    ['.frequency-quote', 'Chúc bạn tôi có một ngày 20/10 thật vui bên bạn bè và người thân.'],
    ['.finale-signature', 'Lâm đẹp zai']
  ].map(([selector, personalText]) => {
    const element = $(selector);
    return { element, personalText, defaultHTML: element.innerHTML };
  });

  function personalizeSender(student) {
    const personal = Boolean(student?.sender);
    senderCopy.forEach(({ element, personalText, defaultHTML }) => {
      if (personal) element.textContent = personalText;
      else element.innerHTML = defaultHTML;
    });
    document.title = personal ? `20/10 · Lâm gửi ${student.name}` : defaultPageTitle;
    titles[0] = personal ? 'Quà 20/10 của Lâm' : 'Quà 20/10 của lớp';
    titles[4] = personal ? 'Lời chúc của Lâm' : 'Lời chúc của lớp';
  }

  function announce(message) { $('#announcement').textContent = message; }
  function updateNavigation() {
    $('#step-label').innerHTML = `${String(currentSlide + 1).padStart(2, '0')} <span>/ 06</span>`;
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentSlide); step.classList.toggle('done', index < currentSlide);
      if (index === currentSlide) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
    });
  }
  async function advanceAfterMoment(index) {
    // Let the wish remain readable after its animation, then advance once.
    await new Promise(resolve => setTimeout(resolve, reduceMotion.matches ? 650 : 2200));
    if (currentSlide === index && completed[index]) await goToSlide(index + 1);
  }
  async function goToSlide(index) {
    if (transitioning || busy || index < 0 || index >= scenes.length || index === currentSlide || (index > 0 && !selectedStudent)) return;
    if (index > currentSlide && !completed[currentSlide]) { announce(currentSlide === 1 ? `Bạn đã mở ${dateTapCount}/10 bông hoa. Chạm vào 20/10 đủ 10 lần nhé.` : 'Khám phá món quà ở giữa màn hình trước khi tiếp tục nhé.'); return; }
    transitioning = true;
    const previous = scenes[currentSlide];
    previous.classList.remove('active'); previous.classList.add('leaving'); previous.inert = true; previous.setAttribute('aria-hidden', 'true');
    currentSlide = index;
    const next = scenes[index]; next.inert = false; next.removeAttribute('aria-hidden'); next.classList.remove('leaving'); next.classList.add('active');
    updateNavigation();
    if (index === 4 && !$('#letter-paper').hidden) updateScrollNote();
    announce(`${index + 1} trên 6. ${titles[index]}.`);
    // Focus the heading without moving the viewport or intercepting letter scrolling.
    const heading = $('h1, h2', next); heading.focus({ preventScroll: true });
    if (index === 5) { await delay(850); burst($('.finale-bouquet'), 'confetti', 55); }
    await delay(index === 5 ? 100 : 700);
    previous.classList.remove('leaving'); transitioning = false;
  }
  function completeSlide(index, messageId, hintId) {
    completed[index] = true;
    if (messageId) $(messageId).classList.add('visible');
    if (hintId) $(hintId).classList.add('completed');
    updateNavigation();
  }
  function personalize(student) {
    selectedStudent = student;
    personalizeSender(student);
    letterRead = false; $('#finish-letter').disabled = true;
    $$('[data-student-name]').forEach(el => { el.textContent = student.name; });
    $('#greeting-name').textContent = student.name;
    // textContent ensures the student data never becomes executable HTML.
    const letter = $('#letter-content'); letter.replaceChildren();
    student.letter.replace(/\r\n?/g, '\n').split(/\n[\t ]*\n/).forEach((paragraph, index) => {
      const p = document.createElement('p'); p.textContent = paragraph;
      p.style.setProperty('--paragraph-delay', `${Math.min(index * .07, .45)}s`); letter.appendChild(p);
    });
  }

  $('#student-form').addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    const id = $('#student-id').value.trim();
    const student = students.find(item => item.mssv === id);
    if (!student) {
      $('#form-error').textContent = id ? 'Chưa tìm thấy MSSV này. Bạn kiểm tra lại nhé, hoặc nhập 0 để xem thử.' : 'Bạn nhập mã số sinh viên trước nhé.';
      $('#student-id').setAttribute('aria-invalid', 'true'); $('#student-id').focus(); return;
    }
    if (typeof student.name !== 'string' || typeof student.letter !== 'string' || !student.letter.trim()) { $('#form-error').textContent = 'Bức thư của bạn chưa được chuẩn bị xong. Hãy nhắn các bạn nam ĐTVT nhé.'; return; }
    busy = true; personalize(student); $('#form-error').textContent = ''; $('#student-id').removeAttribute('aria-invalid');
    $('#student-form').classList.add('departing');
    await delay(400); $('#student-form').hidden = true;
    $('#intro-envelope').classList.add('open');
    await delay(750); burst($('#intro-envelope'), 'mixed', 40);
    $('#intro-greeting').hidden = false;
    await delay(1300); completed[0] = true; busy = false; updateNavigation();
    $('#scene-0').classList.add('ready-to-continue');
    $('#intro-tap-hint').hidden = false;
    const envelopeArea = $('.intro-envelope-wrap');
    envelopeArea.setAttribute('role', 'button'); envelopeArea.tabIndex = 0;
    envelopeArea.setAttribute('aria-label', 'Chạm để xem màn 20 tháng 10');
    envelopeArea.focus({ preventScroll: true });
    announce(`Chào ${student.name}. Chạm vào phong thư để xem tiếp.`);
  });
  $('#student-id').addEventListener('input', () => { $('#form-error').textContent = ''; $('#student-id').removeAttribute('aria-invalid'); });
  $('#demo-button').addEventListener('click', () => { $('#student-id').value = '0'; $('#student-form').requestSubmit(); });
  $('#celebrate-date').addEventListener('click', async () => {
    burst($('#celebrate-date'), dateTapCount % 3 ? 'petal' : 'mixed', dateTapCount < 9 ? 22 : 70);
    if (dateTapCount >= 10) return;
    dateTapCount++;
    $$('.wish-flower')[dateTapCount - 1].classList.add('is-collected');
    $('#wish-count strong').textContent = dateTapCount;
    $('#wish-progress').setAttribute('aria-valuenow', String(dateTapCount));
    $('#wish-progress span').style.width = `${dateTapCount * 10}%`;
    $('#celebrate-date').setAttribute('aria-label', `Chạm để hoa nở, ${dateTapCount} trên 10`);
    $('#date-hint').textContent = `${littleWishes[dateTapCount - 1]} ${dateTapCount < 10 ? `Chạm thêm ${10 - dateTapCount} lần nữa nhé ♡` : 'Đủ 10/10 bông hoa rồi!'}`;
    if (!reduceMotion.matches) $('#wish-count').animate([{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:360});
    announce(`${dateTapCount} trên 10. ${littleWishes[dateTapCount - 1]}`); updateNavigation();
    if (dateTapCount < 10) return;
    $('#scene-1').classList.add('celebrated');
    await delay(1600); completeSlide(1, '#date-message');
    $('#date-hint').textContent = 'Đủ 10 bông hoa rồi! Còn quà nữa nhé.';
    await advanceAfterMoment(1);
  });
  $('#bloom-button').addEventListener('click', async () => {
    const button = $('#bloom-button'); burst(button, button.classList.contains('bloom-open') ? 'mixed' : 'petal', 32);
    if (button.classList.contains('bloom-open') || button.classList.contains('flower-drawing')) return;
    button.classList.add('flower-drawing'); $('#flower-hint').textContent = 'Đợi hoa nở một chút nhé.';
    await delay(1250); button.classList.add('bloom-open'); burst(button,'mixed',45);
    button.setAttribute('aria-pressed', 'true'); button.setAttribute('aria-label', 'Hoa đã nở, chạm để xem thêm hiệu ứng');
    await delay(2650); completeSlide(2, '#flower-message', '#flower-hint'); announce($('#flower-message').textContent);
    await advanceAfterMoment(2);
  });
  $('#gift-button').addEventListener('click', async () => {
    const button = $('#gift-button');
    if (openingGift) return;
    if (completed[3]) { burst(button, 'mixed', 35); return; }
    openingGift = true; button.classList.add('gift-opening'); await delay(550);
    button.classList.remove('gift-opening'); button.classList.add('gift-open'); button.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-label', 'Bó hoa của bạn — chạm để tạo ánh sáng và cánh hoa');
    await delay(550); burst(button, 'mixed', 50);
    await delay(1250); completeSlide(3, '#gift-message', '#gift-hint'); openingGift = false; announce($('#gift-message').textContent);
    await advanceAfterMoment(3);
  });

  let letterAnimating = false;
  async function openLetter() {
    if (letterAnimating) return; letterAnimating = true;
    const envelope = $('.letter-envelope'); envelope.classList.add('open'); burst(envelope, 'petal', 14);
    $('#open-letter').setAttribute('aria-expanded', 'true');
    await delay(650);
    $('#letter-stage').classList.add('opened'); $('#scene-4').classList.add('reading');
    $('#letter-paper').hidden = false; $('#open-letter').inert = true; $('#letter-hint').hidden = true;
    await delay(850); completeSlide(4); updateScrollNote();
    $('#letter-scroll').focus({ preventScroll: true }); announce('Bức thư đã mở. Bạn có thể cuộn phần giấy thư để đọc toàn bộ.');
    letterAnimating = false;
  }
  $('#open-letter').addEventListener('click', openLetter);
  $('#close-letter').addEventListener('click', () => {
    if (letterAnimating) return;
    $('#letter-paper').hidden = true; $('#letter-stage').classList.remove('opened'); $('#scene-4').classList.remove('reading');
    $('.letter-envelope').classList.remove('open'); $('#open-letter').setAttribute('aria-expanded', 'false'); $('#open-letter').inert = false;
    $('#letter-hint').hidden = false; $('#open-letter').focus({ preventScroll: true });
  });
  function updateScrollNote() {
    if ($('#letter-paper').hidden) return;
    const area = $('#letter-scroll');
    const atEnd = area.scrollHeight - area.clientHeight - area.scrollTop <= 12;
    if (atEnd) letterRead = true;
    $('#finish-letter').disabled = !letterRead;
    $('#scroll-note').textContent = atEnd ? 'Chạm vào trái tim để nhận bó hoa ♡' : 'Cuộn để đọc tiếp ↓';
  }
  $('#letter-scroll').addEventListener('scroll', updateScrollNote, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(updateScrollNote).observe($('#letter-scroll'));
  addEventListener('resize', () => { if (currentSlide === 4) updateScrollNote(); }, { passive: true });
  $('#finish-letter').addEventListener('click', () => {
    if (letterRead && !letterAnimating) goToSlide(5);
  });
  function activateCenter() {
    if (busy || transitioning) return;
    if (currentSlide === 0 && completed[0]) goToSlide(1);
    else if (currentSlide === 1) $('#celebrate-date').click();
    else if (currentSlide === 2) $('#bloom-button').click();
    else if (currentSlide === 3) $('#gift-button').click();
    else if (currentSlide === 4) {
      if ($('#letter-paper').hidden) openLetter();
      else if (letterRead && !letterAnimating) goToSlide(5);
    }
  }
  $('#experience').addEventListener('click', event => {
    // The paper keeps its native scrolling, text selection and close control.
    if (event.target.closest('button, input, a, form, .letter-paper')) return;
    activateCenter();
  });
  document.addEventListener('keydown', event => {
    if (event.target.closest('button, input, textarea, a, .letter-paper') || !event.target.closest('#experience')) return;
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateCenter(); }
  });

  $('#replay-button').addEventListener('click', async () => {
    if (transitioning) return;
    document.body.classList.add('experience-resetting');
    await goToSlide(0);
    personalizeSender(null);
    completed.fill(false, 0, 5);
    letterRead = false; $('#finish-letter').disabled = true;
    $('#student-form').hidden = false; $('#student-form').classList.remove('departing');
    $('#intro-greeting').hidden = true; $('#intro-envelope').classList.remove('open');
    $('#intro-tap-hint').hidden = true; $('#scene-0').classList.remove('ready-to-continue');
    const envelopeArea = $('.intro-envelope-wrap');
    envelopeArea.removeAttribute('role'); envelopeArea.removeAttribute('tabindex'); envelopeArea.removeAttribute('aria-label');
    $('#scene-1').classList.remove('celebrated');
    dateTapCount = 0; $('#wish-count strong').textContent = '0'; $('#wish-progress').setAttribute('aria-valuenow','0'); $('#wish-progress span').style.width = '0%';
    $$('.wish-flower').forEach(el => el.classList.remove('is-collected')); $('#celebrate-date').setAttribute('aria-label','Chạm để hoa nở, 0 trên 10');
    $('#date-hint').textContent = 'Chạm vào 20/10 đủ 10 lần để hoa nở nhé!';
    $('#bloom-button').classList.remove('bloom-open', 'flower-drawing'); $('#bloom-button').setAttribute('aria-pressed', 'false'); $('#bloom-button').setAttribute('aria-label', 'Chạm để bông hoa nở');
    $('#flower-hint').textContent = 'Chạm vào bông hoa để hoa nở.';
    $('#gift-button').classList.remove('gift-open', 'gift-opening'); $('#gift-button').setAttribute('aria-pressed', 'false'); $('#gift-button').setAttribute('aria-label', 'Mở hộp quà');
    $$('.reveal-message').forEach(el => el.classList.remove('visible'));
    $$('.interaction-hint').forEach(el => el.classList.remove('completed'));
    $('#letter-paper').hidden = true; $('#letter-stage').classList.remove('opened'); $('#scene-4').classList.remove('reading');
    $('.letter-envelope').classList.remove('open'); $('#open-letter').setAttribute('aria-expanded', 'false'); $('#open-letter').inert = false; $('#letter-hint').hidden = false; $('#letter-scroll').scrollTop = 0;
    $('#save-status').textContent = ''; $('#form-error').textContent = ''; updateNavigation();
    $('#student-id').focus({ preventScroll: true });
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('experience-resetting')));
  });

  // Play the supplied MP3 from the beginning and repeat it normally.
  const audio = $('#background-music');
  let musicWanted = true;
  let musicFallback = null;
  audio.volume = .5;
  function updateSoundButton() {
    const playing = !audio.paused && !audio.ended && !audio.muted;
    $('#sound-toggle').setAttribute('aria-pressed', String(playing));
    $('#sound-toggle').setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
    if (playing || !musicWanted) $('#music-notice').hidden = true;
  }
  function showMusicError(error, explicit = false) {
    if (!musicWanted || error.name === 'AbortError') return;
    let message;
    if (error.name === 'NotAllowedError') message = 'Chạm vào màn hình để bật nhạc.';
    else if (error.name === 'MusicFileError') message = error.message;
    else if (audio.error?.code === 3) message = 'Trình duyệt không đọc được file nhạc. Bạn thử mở trang bằng Chrome hoặc Safari.';
    else if (error.name === 'TypeError') message = 'Không tải được nhạc trong chế độ xem này. Bạn thử mở index.html bằng trình duyệt.';
    else message = 'Nhạc chưa phát được. Chạm nút nhạc để thử lại.';
    $('#music-notice').textContent = message;
    $('#music-notice').hidden = false;
    if (explicit) announce(message);
  }
  function loadMusicFallback() {
    if (!musicFallback) musicFallback = Promise.resolve().then(() => {
      // The embedded copy is the exact supplied MP3. It also works on file://,
      // where fetch() cannot read a neighboring file in Chrome/Edge.
      const encoded = $('#embedded-music')?.textContent.trim();
      if (!encoded) {
        const error = new Error('Thiếu file music.mp3 và bản nhạc dự phòng. Bạn mở lại index.html trong thư mục DTV1.');
        error.name = 'MusicFileError'; throw error;
      }
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      audio.src = URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }));
      audio.load();
    });
    return musicFallback;
  }
  async function playMusic(explicit = false) {
    if (!musicWanted || document.hidden) return;
    try {
      audio.muted = false;
      await audio.play();
      if (!musicWanted || document.hidden) audio.pause();
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'AbortError') showMusicError(error, explicit);
      else {
        try {
          await loadMusicFallback();
          if (!musicWanted || document.hidden) return;
          await audio.play();
          if (!musicWanted || document.hidden) audio.pause();
        } catch (fallbackError) { showMusicError(fallbackError, explicit); }
      }
    }
    updateSoundButton();
  }
  audio.addEventListener('playing', updateSoundButton);
  audio.addEventListener('pause', updateSoundButton);
  $('#sound-toggle').addEventListener('click', () => {
    if (!audio.paused && !audio.muted && musicWanted) {
      musicWanted = false; audio.pause(); announce('Đã tắt nhạc nền.');
    } else {
      musicWanted = true; void playMusic(true);
    }
  });
  function startMusicOnInteraction(event) {
    if (event.target.closest?.('#sound-toggle')) return;
    if (musicWanted && (audio.paused || audio.muted)) void playMusic();
  }
  document.addEventListener('pointerdown', startMusicOnInteraction, { capture: true, passive: true });
  document.addEventListener('pointerup', startMusicOnInteraction, { capture: true, passive: true });
  document.addEventListener('touchend', startMusicOnInteraction, { capture: true, passive: true });
  document.addEventListener('click', startMusicOnInteraction, { capture: true });
  document.addEventListener('keydown', startMusicOnInteraction, { capture: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    else if (musicWanted) void playMusic();
  });
  addEventListener('pagehide', () => audio.pause());
  addEventListener('pageshow', () => { if (musicWanted) void playMusic(); });
  void playMusic();

  // Standalone SVG -> Canvas -> PNG. Its definitions are embedded so file:// works too.
  $('#save-card').addEventListener('click', async () => {
    if (!selectedStudent) return;
    const button = $('#save-card'); button.disabled = true; $('#save-status').textContent = 'Đang tạo thiệp…';
    let imageURL = null, downloadURL = null;
    try {
      const name = escapeXML(selectedStudent.name);
      const sender = escapeXML(selectedStudent.sender || 'Các bạn nam lớp ĐTVT');
      const cardSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600" fill="none"><defs>${floralDefs}</defs>
        <rect width="1200" height="1600" fill="#fff1f8"/><rect x="35" y="35" width="1130" height="1530" rx="6" fill="none" stroke="#dfb5d7" stroke-width="2"/>
        <use href="#botanical-branch" x="-100" y="850" width="330" height="630" opacity=".45"/><use href="#botanical-branch" x="980" y="70" width="260" height="500" opacity=".35"/>
        <text x="600" y="126" text-anchor="middle" fill="#889375" font-family="Georgia,serif" font-size="22" letter-spacing="5">${sender.toUpperCase()}</text>
        <g transform="translate(285 130) scale(1.5)">${bouquetMarkup()}</g>
        <rect x="125" y="760" width="950" height="680" rx="4" fill="#fff9fc" stroke="#dfbad4" stroke-width="2"/>
        <text x="600" y="835" text-anchor="middle" fill="#839073" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM</text>
        <text x="600" y="1004" text-anchor="middle" fill="#b87589" font-family="Georgia,serif" font-size="160">20.10</text>
        <text x="600" y="1080" text-anchor="middle" fill="#8f6172" font-family="Georgia,serif" font-style="italic" font-size="${selectedStudent.name.length > 32 ? 29 : selectedStudent.name.length > 22 ? 34 : 40}" ${selectedStudent.name.length > 45 ? 'textLength="830" lengthAdjust="spacingAndGlyphs"' : ''}>Gửi ${name}</text>
        <g text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#7d7d6d"><text x="600" y="1152">Chúc bạn luôn vui vẻ, khỏe mạnh,</text><text x="600" y="1194">học tốt và gặp nhiều may mắn.</text></g>
        <g text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#8b9579"><text x="600" y="1270">Chúc bạn có một ngày 20/10 thật vui</text><text x="600" y="1309">bên bạn bè và người thân.</text></g>
        <text x="600" y="1384" text-anchor="middle" fill="#b17a8d" font-family="Georgia,serif" font-style="italic" font-size="29">${sender}</text>
        <text x="600" y="1510" text-anchor="middle" fill="#a59b88" font-family="Georgia,serif" font-style="italic" font-size="22">Chúc mừng ngày Phụ nữ Việt Nam!</text></svg>`;
      const imageBlob = new Blob([cardSVG], { type: 'image/svg+xml;charset=utf-8' }); imageURL = URL.createObjectURL(imageBlob);
      const image = new Image();
      await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('Không thể vẽ thiệp')); image.src = imageURL; });
      const output = document.createElement('canvas'); output.width = 1200; output.height = 1600;
      const outputCtx = output.getContext('2d'); if (!outputCtx) throw new Error('Canvas chưa được hỗ trợ'); outputCtx.drawImage(image, 0, 0);
      const blob = await new Promise((resolve, reject) => output.toBlob(result => result ? resolve(result) : reject(new Error('Không thể tạo PNG')), 'image/png'));
      downloadURL = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = downloadURL;
      const filename = selectedStudent.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
      link.download = `DTVT-20-10-${filename || 'Thuong-gui-ban'}.png`; document.body.appendChild(link); link.click(); link.remove();
      $('#save-status').textContent = 'Đã tạo thiệp. Bạn xem trong mục tải xuống nhé.';
    } catch { $('#save-status').textContent = 'Chưa lưu được thiệp. Bạn thử lại bằng Chrome hoặc Safari nhé.'; }
    finally { if (imageURL) URL.revokeObjectURL(imageURL); if (downloadURL) setTimeout(() => URL.revokeObjectURL(downloadURL), 60000); button.disabled = false; }
  });

  updateNavigation();
})();
