import * as THREE from "three";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const blobVert = /* glsl */ `
uniform float uTime; uniform vec3 uMouse; uniform float uAmp; uniform float uFreq;
varying vec3 vN; varying vec3 vView; varying float vD;
${NOISE}
float disp(vec3 p){
  float n = snoise(p*uFreq + vec3(0., uTime*.25, uTime*.15));
#ifndef LITE
  n += .35*snoise(p*uFreq*2.3 - uTime*.2);
#endif
  float m = smoothstep(1.6, 0., distance(normalize(p)*1.3, uMouse)); // bulge toward cursor
  return n*uAmp + m*.35;
}
vec3 orth(vec3 v){return abs(v.x)>abs(v.z)?vec3(-v.y,v.x,0.):vec3(0.,-v.z,v.y);}
void main(){
  vec3 n = normalize(normal);
  float d0 = disp(position);
  vec3 p = position + n*d0;
  vec3 t = normalize(orth(n)); vec3 b = normalize(cross(n,t));
  float e = .01;
  vec3 pt = position + t*e; pt += normalize(pt)*disp(pt);
  vec3 pb = position + b*e; pb += normalize(pb)*disp(pb);
  vec3 nn = normalize(cross(pt-p, pb-p));
  if(dot(nn,n)<0.) nn = -nn;
  vD = d0;
  vec4 mv = modelViewMatrix*vec4(p,1.);
  vN = normalize(normalMatrix*nn); vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix*mv;
}`;

const blobFrag = /* glsl */ `
uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform float uDim;
varying vec3 vN; varying vec3 vView; varying float vD;
vec3 pal(float t){ return .5+.5*cos(6.28318*(vec3(1.)*t+vec3(.0,.33,.67))); }
void main(){
  float f = pow(1.-max(dot(vN,vView),0.), 2.2);
  vec3 L = normalize(vec3(.6,.8,.5));
  float diff = max(dot(vN,L),0.);
  float spec = pow(max(dot(reflect(-L,vN),vView),0.), 48.);
  vec3 irid = pal(f*.9 + vD*.6 + uTime*.03);
  vec3 base = mix(vec3(.02,.02,.03), uB*.35, diff*.6);
  vec3 col = base + mix(uA, irid, .45)*f*1.4 + spec*.9;
  col += uA * smoothstep(.25,.6,vD)*.25;
  gl_FragColor = vec4(col*uDim, 1.);
}`;

const ptsVert = /* glsl */ `
uniform float uTime; uniform float uSize; uniform vec3 uMouse; attribute float aR;
varying float vA;
${NOISE}
void main(){
  vec3 p = position;
#ifdef LITE
  p += .25*vec3(sin(p.y*.9+uTime*.4), sin(p.z*.9+uTime*.35+2.), sin(p.x*.9+4.));
#else
  p += .25*vec3(snoise(p*.3+uTime*.05), snoise(p*.3+7.+uTime*.05), snoise(p*.3+13.));
#endif
  vec4 mv = modelViewMatrix*vec4(p,1.);
  vec4 wp = modelMatrix*vec4(p,1.);
  float d = distance(wp.xy, uMouse.xy);
  mv.xy += normalize(wp.xy-uMouse.xy+.0001) * smoothstep(1.4,0.,d)*.6; // repel
  gl_Position = projectionMatrix*mv;
  gl_PointSize = uSize*aR*(1./-mv.z);
  vA = aR*.8;
}`;
const ptsFrag = /* glsl */ `
uniform vec3 uColor; uniform float uDim; varying float vA;
void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(uColor, smoothstep(.5,0.,d)*vA*uDim); }`;

const cardVert = /* glsl */ `
uniform float uBend; uniform float uHover; varying vec2 vUv;
void main(){ vUv=uv; vec3 p=position; p.z += (p.x*p.x)*uBend - uHover*.15; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`;
const cardFrag = /* glsl */ `
uniform sampler2D uTex; uniform float uHover; uniform float uDim; uniform vec2 uRatio; varying vec2 vUv;
void main(){
  vec2 uv = (vUv-.5)*uRatio+.5;
  vec3 c = texture2D(uTex, uv).rgb;
  float g = dot(c, vec3(.299,.587,.114));
  c = mix(vec3(g)*.8, c, .6+uHover*.4);
  float edge = smoothstep(0.,.02,vUv.x)*smoothstep(1.,.98,vUv.x)*smoothstep(0.,.02,vUv.y)*smoothstep(1.,.98,vUv.y);
  gl_FragColor = vec4(c*uDim, edge*smoothstep(0.,.3,uDim));
}`;

export function createScene(canvas, { images, reduced, mobile, onReady, onFail }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: mobile ? "default" : "high-performance", stencil: false });
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  const defines = mobile ? { LITE: "" } : {};
  canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); stop(); onFail && onFail(); });
  renderer.setClearColor(0x07070a, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x07070a, 6, 16);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0, 7);

  const world = new THREE.Group();
  scene.add(world);

  // --- liquid iridescent blob
  const ACC = new THREE.Color("#d4ff3f"), VIO = new THREE.Color("#9047ff");
  const blobU = {
    uTime: { value: 0 }, uMouse: { value: new THREE.Vector3(9, 9, 9) }, uAmp: { value: 0.28 }, uFreq: { value: 0.9 },
    uA: { value: ACC }, uB: { value: VIO }, uDim: { value: 1 },
  };
  const blob = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.25, mobile ? 24 : 72),
    new THREE.ShaderMaterial({ uniforms: blobU, defines, vertexShader: blobVert, fragmentShader: blobFrag })
  );
  world.add(blob);

  // --- particles
  const N = mobile ? 550 : 2200;
  const pos = new Float32Array(N * 3), ar = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = 2.6 + Math.random() * 6.5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    pos[i * 3 + 2] = r * Math.cos(ph);
    ar[i] = 0.4 + Math.random();
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("aR", new THREE.BufferAttribute(ar, 1));
  const ptsU = { uTime: blobU.uTime, uSize: { value: 26 * dpr }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uColor: { value: new THREE.Color("#e9e6df") }, uDim: { value: 1 } };
  const points = new THREE.Points(pg, new THREE.ShaderMaterial({ uniforms: ptsU, defines, vertexShader: ptsVert, fragmentShader: ptsFrag, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  world.add(points);

  // --- orbit of work cards
  const ring = new THREE.Group();
  ring.rotation.x = 0.18;
  world.add(ring);
  const loader = new THREE.TextureLoader();
  const cards = [];
  const list = mobile ? images.slice(0, 5) : images;
  const R = mobile ? 2.5 : 3.1;
  const cardGeo = new THREE.PlaneGeometry(1, 1.25, mobile ? 8 : 16, 1);
  let loaded = 0;
  list.forEach((src, i) => {
    const u = { uTex: { value: null }, uHover: { value: 0 }, uDim: { value: 1 }, uBend: { value: 0.12 }, uRatio: { value: new THREE.Vector2(1, 1) } };
    const m = new THREE.Mesh(cardGeo, new THREE.ShaderMaterial({ uniforms: u, vertexShader: cardVert, fragmentShader: cardFrag, transparent: true, side: THREE.DoubleSide }));
    const a = (i / list.length) * Math.PI * 2;
    m.position.set(Math.cos(a) * R, Math.sin(a * 2) * 0.25, Math.sin(a) * R);
    m.lookAt(0, m.position.y, 0); m.rotateY(Math.PI);
    m.userData = { u, hover: 0 };
    loader.load(src, (t) => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = mobile ? 1 : 4;
      const ir = t.image.width / t.image.height, pr = 1 / 1.25;
      u.uRatio.value.set(ir > pr ? pr / ir : 1, ir > pr ? 1 : ir / pr);
      u.uTex.value = t;
      if (++loaded === list.length) onReady && onReady();
    }, undefined, () => { if (++loaded === list.length) onReady && onReady(); });
    ring.add(m); cards.push(m);
  });

  // --- state driven by scroll (GSAP writes into this)
  const state = { camX: 0, camY: 0, camZ: mobile ? 8.5 : 7, lookY: 0, worldX: 0, ringSpin: 0, ringTilt: 0.18, dim: 1, cardDim: 1, ringScale: 1, blobScale: mobile ? 0.8 : 1, amp: 0.22 };

  const mouse = new THREE.Vector2(0, 0), smooth = new THREE.Vector2(0, 0);
  const ray = new THREE.Raycaster();
  let hovered = null;
  const onMove = (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = -(e.clientY / innerHeight) * 2 + 1; };
  window.addEventListener("pointermove", onMove, { passive: true });

  const resize = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 700 ? 55 : 42;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let running = true, wanted = true, raf = 0, velocity = 0;
  let fpsN = 0, fpsT = 0, tuned = !mobile; // phones: drop resolution once if the GPU can't keep up
  const tmp = new THREE.Vector3();

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    blobU.uTime.value = reduced ? 2 : t;
    smooth.lerp(mouse, 0.06);

    // camera choreography
    camera.position.set(state.camX + smooth.x * 0.35, state.camY + smooth.y * 0.25, state.camZ);
    camera.lookAt(0, state.lookY, 0);
    world.position.x += (state.worldX - world.position.x) * 0.08;

    // mouse-reactive blob
    world.rotation.y += ((smooth.x * 0.35) - world.rotation.y) * 0.05;
    world.rotation.x += ((-smooth.y * 0.2) - world.rotation.x) * 0.05;
    blob.rotation.y += dt * 0.12;
    blob.scale.setScalar(state.blobScale);
    blobU.uAmp.value = state.amp + Math.min(Math.abs(velocity) * 0.002, 0.25);
    tmp.set(smooth.x * 2.2, smooth.y * 1.6, 1.2);
    blobU.uMouse.value.lerp(tmp, 0.1);
    ptsU.uMouse.value.set(smooth.x * 5, smooth.y * 3, 0);

    // orbit
    ring.rotation.y = (reduced ? 0 : t * 0.08) + state.ringSpin;
    ring.rotation.x = state.ringTilt;
    ring.scale.setScalar(state.ringScale);
    points.rotation.y = t * 0.015;

    // hover cards (fine pointers only)
    if (!mobile) {
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects(cards, false)[0];
      hovered = hit ? hit.object : null;
      canvas.style.cursor = hovered ? "pointer" : "";
    }
    for (const c of cards) {
      c.userData.hover += ((c === hovered ? 1 : 0) - c.userData.hover) * 0.12;
      c.userData.u.uHover.value = c.userData.hover;
      c.userData.u.uDim.value = Math.min(state.dim, state.cardDim);
      c.visible = state.cardDim > 0.02;
      const s = 1 + c.userData.hover * 0.12;
      c.scale.set(s, s, s);
    }
    blobU.uDim.value = state.dim; ptsU.uDim.value = state.dim;

    renderer.render(scene, camera);
    velocity *= 0.9;
    if (!tuned && t > 1.5) {
      fpsN++; fpsT += dt;
      if (fpsN >= 90) { tuned = true; if (fpsN / fpsT < 45 && dpr > 1) { dpr = 1; renderer.setPixelRatio(1); resize(); ptsU.uSize.value = 26; } }
    }
    if (running) raf = requestAnimationFrame(frame);
  }

  const run = () => { if (!running && wanted && !document.hidden) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); } };
  const halt = () => { running = false; cancelAnimationFrame(raf); };
  function start() { wanted = true; run(); }
  function stop() { wanted = false; halt(); }
  document.addEventListener("visibilitychange", () => (document.hidden ? halt() : run()));
  raf = requestAnimationFrame(frame);

  return { state, setVelocity: (v) => (velocity = v), start, stop, renderOnce: frame };
}
