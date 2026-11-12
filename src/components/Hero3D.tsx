import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Orbit, Layers, RefreshCw } from 'lucide-react';

type SceneMode = 'synapse' | 'landscape' | 'latent';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>('synapse');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [activeNodeTelemetry, setActiveNodeTelemetry] = useState<string>('Node #042 · Active Weight: +0.842');

  // Mutable refs to pass into render loop without recreation
  const sceneModeRef = useRef<SceneMode>(sceneMode);
  sceneModeRef.current = sceneMode;
  const speedRef = useRef<number>(speedMultiplier);
  speedRef.current = speedMultiplier;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL Detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene, Camera, Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080B16, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.replaceChildren(renderer.domElement);

    // 3. Futuristic Studio Lighting Rig: Electric Blue & Vibrant Purple
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa855f7, 3.2); // Vibrant Purple Key Light
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 2.8); // Electric Cyan/Blue Fill Light
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc084fc, 2.5, 9); // Neon Purple Rim Light
    rimLight.position.set(0, 0, -2);
    scene.add(rimLight);

    // 4. Procedural 3D Neural Cortex & Geometric Elements (3-12 parts)
    const cortexGroup = new THREE.Group();
    scene.add(cortexGroup);

    // Part 1: Geodesic Synaptic Core (Inner Sphere)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x7c3aed, // Purple emissive glow
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cortexGroup.add(coreMesh);

    // Part 2: Wireframe Overlay Lattice (Electric Blue)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    cortexGroup.add(wireMesh);

    // Part 3: Inner Orbital Tensor Ring
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    cortexGroup.add(ring1);

    // Part 4: Middle Inclined Orbital Ring
    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      roughness: 0.25,
      metalness: 0.85,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    cortexGroup.add(ring2);

    // Part 5: Outer Celestial Ring
    const ringGeo3 = new THREE.TorusGeometry(2.3, 0.01, 16, 120);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.4,
      metalness: 0.7,
      transparent: true,
      opacity: 0.7,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 5;
    cortexGroup.add(ring3);

    // Part 6: Orbital Synaptic Nodes
    const nodeCount = 18;
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
    });

    const nodeMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1.4 : 1.85;
      node.position.set(Math.cos(angle) * radius, (Math.sin(angle) * radius * 0.4), Math.sin(angle) * radius);
      cortexGroup.add(node);
      nodeMeshes.push(node);
    }

    // Part 7: Dynamic Neural Synaptic Lines
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const nPos = nodeMeshes[i].position;
      linePositions.push(0, 0, 0);
      linePositions.push(nPos.x, nPos.y, nPos.z);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
    });
    const synLines = new THREE.LineSegments(lineGeo, lineMat);
    cortexGroup.add(synLines);

    // Part 8: Procedural Loss Landscape Mesh (Toggled in 'landscape' mode)
    const planeSize = 3.6;
    const planeSegments = 32;
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments);
    const posAttr = planeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = posAttr.getX(i);
      const v = posAttr.getY(i);
      // Complex multi-minima saddle loss surface: z = sin(2u)*cos(2v)*0.35 + (u^2+v^2)*0.15
      const z = Math.sin(u * 2.2) * Math.cos(v * 2.2) * 0.35 + (u * u + v * v) * 0.1;
      posAttr.setZ(i, z);
    }
    planeGeo.computeVertexNormals();
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.4,
      metalness: 0.6,
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const landscapeMesh = new THREE.Mesh(planeGeo, planeMat);
    landscapeMesh.rotation.x = -Math.PI / 2.5;
    landscapeMesh.position.y = -0.3;
    landscapeMesh.visible = false;
    scene.add(landscapeMesh);

    // Part 9: Ambient 3D Particle Tensor Field
    const particleCount = isSoftwareGl ? 350 : 800;
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pPositions[idx] = (Math.random() - 0.5) * 12;
      pPositions[idx + 1] = (Math.random() - 0.5) * 8;
      pPositions[idx + 2] = (Math.random() - 0.5) * 8;
      pScales[i] = Math.random() * 0.03 + 0.01;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Part 10: Grounding Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(4, 4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030712,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.8;
    scene.add(shadowMesh);

    // 5. Pointer Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };
    container.addEventListener('mousemove', handlePointerMove);

    // 6. Animation Loop with Software WebGL Guard
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 70);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function animate() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * speedRef.current;
      const mode = sceneModeRef.current;

      // Mode Visibility Toggling
      if (mode === 'landscape') {
        cortexGroup.visible = false;
        landscapeMesh.visible = true;
        landscapeMesh.rotation.z = time * 0.15;
      } else {
        cortexGroup.visible = true;
        landscapeMesh.visible = false;
      }

      // Smooth exponential damping rotation toward target pointer
      cortexGroup.rotation.y = THREE.MathUtils.damp(cortexGroup.rotation.y, targetRotY + time * 0.25, 3, delta);
      cortexGroup.rotation.x = THREE.MathUtils.damp(cortexGroup.rotation.x, targetRotX, 3, delta);

      // Orbital Rings Rotation
      ring1.rotation.y = time * 0.35;
      ring2.rotation.z = -time * 0.4;
      ring3.rotation.x = time * 0.2;

      // Dynamic Node Pulsing
      for (let i = 0; i < nodeCount; i++) {
        const mesh = nodeMeshes[i];
        const baseAngle = (i / nodeCount) * Math.PI * 2;
        const currentAngle = baseAngle + time * (i % 2 === 0 ? 0.4 : -0.3);
        const radius = i % 2 === 0 ? 1.4 : 1.85;
        mesh.position.x = Math.cos(currentAngle) * radius;
        mesh.position.z = Math.sin(currentAngle) * radius;
        mesh.position.y = Math.sin(currentAngle * 2 + time) * 0.2;
      }

      // Update Connection Line Positions
      const positions = lineGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const idx = i * 6;
        positions[idx + 3] = nodeMeshes[i].position.x;
        positions[idx + 4] = nodeMeshes[i].position.y;
        positions[idx + 5] = nodeMeshes[i].position.z;
      }
      lineGeo.attributes.position.needsUpdate = true;

      // Particle Drift
      particles.rotation.y = -time * 0.05;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    }

    animate();

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handlePointerMove);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringGeo3.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      ringMat3.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-2xl bg-slate-950/70 border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Spec Ribbon */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800/80 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Interactive 3D Tensor Cortex</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800/80 backdrop-blur-sm">
          <span>{activeNodeTelemetry}</span>
        </div>
      </div>

      {/* WebGL Canvas Isolated Mount */}
      <div ref={mountRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Unified Bottom Control Dock (Ergonomic Zero-Occlusion Dock per Skill Directives) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-lg transition-transform duration-300 ${
          isCinemaMode ? 'translate-y-12 opacity-30 hover:opacity-100 hover:translate-y-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex flex-col gap-1.5 p-2 bg-slate-900/90 border border-slate-800/90 rounded-xl shadow-xl backdrop-blur-md">
          {/* Header Row: Cinema Toggle */}
          <div className="flex items-center justify-between px-2 pt-0.5 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-500">CANVAS CONTROL DOCK</span>
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
              title="Toggle HUD Visibility"
            >
              {isCinemaMode ? <Eye className="w-3 h-3 text-sky-400" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
              <span>{isCinemaMode ? 'Show HUD' : 'Zen View'}</span>
            </button>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950/80 rounded-lg">
            <button
              onClick={() => setSceneMode('synapse')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-md transition-all ${
                sceneMode === 'synapse'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Orbit className="w-3 h-3" />
              <span>Synaptic Core</span>
            </button>
            <button
              onClick={() => setSceneMode('landscape')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-md transition-all ${
                sceneMode === 'landscape'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Loss Surface</span>
            </button>
            <button
              onClick={() => {
                const speeds = [0.5, 1.0, 2.0];
                const nextSpeed = speeds[(speeds.indexOf(speedMultiplier) + 1) % speeds.length];
                setSpeedMultiplier(nextSpeed);
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-md transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span className="font-mono">{speedMultiplier}x Speed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
