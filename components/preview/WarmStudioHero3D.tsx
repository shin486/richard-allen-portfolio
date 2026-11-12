"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import {
  ArrowLeft,
  Maximize2,
  Compass,
  Volume2,
  VolumeX,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  Sun,
  Moon,
} from "lucide-react";

export const WarmStudioHero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: string; y: string }>({
    x: "+0.00",
    y: "+0.00",
  });
  const [timeString, setTimeString] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("01");
  const [lightingMode, setLightingMode] = useState<"amber" | "twilight" | "mono">("amber");
  const [isHoveringOrb, setIsHoveringOrb] = useState<boolean>(false);

  // Time ticker in Manila (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(`${now.toLocaleTimeString("en-GB", options)} UTC+8`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Three.js 3D Studio Engine
  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    let width = mountEl.clientWidth;
    let height = mountEl.clientHeight;

    // 1. Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);
    scene.fog = new THREE.FogExp2(0x09090b, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 9.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountEl.appendChild(renderer.domElement);

    // 4. Main Scene Group (tilts smoothly with mouse)
    const studioGroup = new THREE.Group();
    scene.add(studioGroup);

    // 5. Lighting Setup (Photographic 3-Point Studio + Radiant Warm Orb)
    // Ambient Light (deep charcoal floor fill)
    const ambientLight = new THREE.AmbientLight(0x16161d, 1.4);
    scene.add(ambientLight);

    // Cool Rim Light (opposing side for edge definition)
    const coolRimLight = new THREE.DirectionalLight(0x384a60, 2.2);
    coolRimLight.position.set(-6, 4.5, -4);
    scene.add(coolRimLight);

    // Subtle Top Softbox
    const topSoftbox = new THREE.DirectionalLight(0xffffff, 0.6);
    topSoftbox.position.set(0, 8, 2);
    scene.add(topSoftbox);

    // Radiant Warm Amber PointLight (Centerpiece)
    const orbLight = new THREE.PointLight(0xff9431, 14, 22, 1.8);
    orbLight.castShadow = true;
    orbLight.shadow.mapSize.width = 1024;
    orbLight.shadow.mapSize.height = 1024;
    orbLight.shadow.bias = -0.001;
    studioGroup.add(orbLight);

    // Secondary subtle warm bounce
    const warmBounceLight = new THREE.PointLight(0xff5500, 3, 8, 2);
    studioGroup.add(warmBounceLight);

    // 6. Materials (Tactile Matte Charcoal + Brushed Metal)
    const charcoalMatteMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181f,
      roughness: 0.68,
      metalness: 0.18,
    });

    const slateAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x24242d,
      roughness: 0.45,
      metalness: 0.4,
    });

    const beveledEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.8,
      metalness: 0.1,
    });

    // Radiant Glowing Orb Material
    const orbCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb859,
      emissive: 0xff7b18,
      emissiveIntensity: 4.2,
      roughness: 0.1,
      metalness: 0.1,
      toneMapped: false,
    });

    const orbHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8811,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    // 7. Meshes Construction (Tamal Sen Inspired Geometric Composition)
    // A. The Glowing Warm Amber Orb
    const orbGroup = new THREE.Group();
    orbGroup.position.set(0.9, 0.7, 0.8);
    studioGroup.add(orbGroup);

    const orbGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const orbMesh = new THREE.Mesh(orbGeo, orbCoreMaterial);
    orbGroup.add(orbMesh);

    const haloGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const haloMesh = new THREE.Mesh(haloGeo, orbHaloMaterial);
    orbGroup.add(haloMesh);

    // Position light inside the orb
    orbLight.position.copy(orbGroup.position);
    warmBounceLight.position.set(orbGroup.position.x, orbGroup.position.y - 0.5, orbGroup.position.z);

    // B. Base Ground Pedestal Slab
    const pedestalGeo = new THREE.BoxGeometry(4.6, 0.35, 2.8);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, beveledEdgeMaterial);
    pedestalMesh.position.set(0, -1.6, 0);
    pedestalMesh.receiveShadow = true;
    studioGroup.add(pedestalMesh);

    // C. Architectural Matte Charcoal Cube (Angled Center-Left)
    const cubeGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const cubeMesh = new THREE.Mesh(cubeGeo, charcoalMatteMaterial);
    cubeMesh.position.set(-1.3, -0.35, 0.2);
    cubeMesh.rotation.set(0.42, 0.65, 0.1);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;
    studioGroup.add(cubeMesh);

    // D. Vertical Architectural Cylinder (Center-Right Pedestal Block)
    const cylinderGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.8, 36);
    const cylinderMesh = new THREE.Mesh(cylinderGeo, slateAccentMaterial);
    cylinderMesh.position.set(1.4, -0.45, -0.2);
    cylinderMesh.castShadow = true;
    cylinderMesh.receiveShadow = true;
    studioGroup.add(cylinderMesh);

    // E. Floating Torus Ring (Floating around the orb)
    const torusGeo = new THREE.TorusGeometry(0.85, 0.08, 24, 64);
    const torusMesh = new THREE.Mesh(torusGeo, charcoalMatteMaterial);
    torusMesh.position.set(0.9, 0.7, 0.8);
    torusMesh.rotation.set(1.2, 0.4, 0.2);
    torusMesh.castShadow = true;
    studioGroup.add(torusMesh);

    // F. Secondary Small Monolith / Rectangular Prism
    const smallPrismGeo = new THREE.BoxGeometry(0.6, 1.1, 0.6);
    const smallPrismMesh = new THREE.Mesh(smallPrismGeo, charcoalMatteMaterial);
    smallPrismMesh.position.set(-0.2, -0.85, 1.1);
    smallPrismMesh.rotation.set(0, 0.35, 0);
    smallPrismMesh.castShadow = true;
    smallPrismMesh.receiveShadow = true;
    studioGroup.add(smallPrismMesh);

    // G. Floating Satellite Octahedron
    const octGeo = new THREE.OctahedronGeometry(0.35, 0);
    const octMesh = new THREE.Mesh(octGeo, slateAccentMaterial);
    octMesh.position.set(-2.2, 1.2, -0.5);
    octMesh.rotation.set(0.3, 0.2, 0.5);
    octMesh.castShadow = true;
    studioGroup.add(octMesh);

    // H. Floating Small Accent Sphere
    const sphereAccentGeo = new THREE.SphereGeometry(0.25, 24, 24);
    const sphereAccentMesh = new THREE.Mesh(sphereAccentGeo, charcoalMatteMaterial);
    sphereAccentMesh.position.set(2.4, 1.4, -0.8);
    sphereAccentMesh.castShadow = true;
    studioGroup.add(sphereAccentMesh);

    // 8. Dynamic Mouse Tracking & Inertial Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let targetCamY = 0.4;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragRotY = 0;
    let dragRotX = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = mountEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      targetRotY = mouseX * 0.35 + dragRotY;
      targetRotX = -mouseY * 0.22 + dragRotX;
      targetCamY = 0.4 + mouseY * 0.25;

      setCoords({
        x: (mouseX >= 0 ? "+" : "") + mouseX.toFixed(2),
        y: (mouseY >= 0 ? "+" : "") + mouseY.toFixed(2),
      });

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        dragRotY += deltaX * 0.005;
        dragRotX += deltaY * 0.005;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // 9. Resize Listener
    const handleResize = () => {
      if (!mountEl) return;
      width = mountEl.clientWidth;
      height = mountEl.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera and studio inertial rotation
      studioGroup.rotation.y += (targetRotY - studioGroup.rotation.y) * 0.055;
      studioGroup.rotation.x += (targetRotX - studioGroup.rotation.x) * 0.055;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;

      // Gentle floating physics / breathing motion
      cubeMesh.rotation.y += 0.002;
      cubeMesh.position.y = -0.35 + Math.sin(elapsedTime * 0.8) * 0.05;

      cylinderMesh.position.y = -0.45 + Math.cos(elapsedTime * 0.7) * 0.04;

      octMesh.rotation.x += 0.006;
      octMesh.rotation.y += 0.008;
      octMesh.position.y = 1.2 + Math.sin(elapsedTime * 1.1) * 0.08;

      sphereAccentMesh.position.y = 1.4 + Math.cos(elapsedTime * 0.9) * 0.07;

      // Orb & Torus harmonic floating
      const orbY = 0.7 + Math.sin(elapsedTime * 1.2) * 0.08;
      const orbX = 0.9 + Math.cos(elapsedTime * 0.9) * 0.06;
      orbGroup.position.y = orbY;
      orbGroup.position.x = orbX;
      orbLight.position.set(orbX, orbY, 0.8);
      warmBounceLight.position.set(orbX, orbY - 0.5, 0.8);

      torusMesh.rotation.z += 0.004;
      torusMesh.rotation.x += 0.002;
      torusMesh.position.y = orbY;
      torusMesh.position.x = orbX;

      // Subtle pulse on the radiant amber core
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      orbMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js resources
      [pedestalGeo, cubeGeo, cylinderGeo, torusGeo, smallPrismGeo, octGeo, sphereAccentGeo, orbGeo, haloGeo].forEach(
        (geo) => geo.dispose()
      );
      [
        charcoalMatteMaterial,
        slateAccentMaterial,
        beveledEdgeMaterial,
        orbCoreMaterial,
        orbHaloMaterial,
      ].forEach((mat) => mat.dispose());

      renderer.dispose();
      if (mountEl && renderer.domElement) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans select-none flex flex-col justify-between">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Layered Architectural Giant Typography (Behind UI, surrounding the 3D studio) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden opacity-[0.06]">
        <span className="text-[17vw] font-black tracking-tighter uppercase font-mono leading-none select-none text-white whitespace-nowrap">
          SHIN.DEV
        </span>
      </div>

      {/* Subtle Studio Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-radial from-transparent via-[#09090b]/30 to-[#09090b] opacity-80" />

      {/* ================= TOP HUD: BRAND & CODE-COMMENT NAVIGATION ================= */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/40 backdrop-blur-xs">
        {/* Left Brand Identifier */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-100">RICHARD ALLEN</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400 group-hover:text-amber-400 transition-colors">
              DEV_STUDIO
            </span>
          </Link>

          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/60 hidden md:inline">
            PROTOTYPE v1.0
          </span>
        </div>

        {/* Center: Tamal Sen Signature Code-Comment Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
          {[
            { id: "01", label: "work" },
            { id: "02", label: "about" },
            { id: "03", label: "sandbox" },
            { id: "04", label: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === item.id
                  ? "bg-zinc-800/80 text-amber-400 font-bold border border-amber-500/30 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent"
              }`}
            >
              <span className="text-zinc-600">//</span>
              <span>
                {item.id} {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right: Exit / Return to Main Portfolio */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-xs px-3.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white transition-all inline-flex items-center gap-2 shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </header>

      {/* ================= MIDDLE HERO: EDITORIAL TEXT OVERLAY ================= */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-end pointer-events-none">
        <div className="max-w-2xl space-y-4 pointer-events-auto">
          {/* Eyebrow Status Monospace */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400/90 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>// 3D STUDIO PROTOTYPE • TAMAL SEN AESTHETIC</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.05]">
            Engineering tactile, <br />
            <span className="text-zinc-200">
              purpose-built software.
            </span>
          </h1>

          {/* Subtitle & Focus */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-mono leading-relaxed">
            Full-Stack &amp; Mobile Developer from De La Salle Lipa. Specializing in offline-first
            React Native, Next.js 14, and high-performance WebGL systems.
          </p>

          {/* Quick Specifications Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-300">LIPA CITY, PH</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-300">BSIT JUNE 2027</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-zinc-600">//</span>
              <span className="text-amber-400/90">AVAILABLE FOR OJT</span>
            </span>
          </div>

          {/* Action Button Strip */}
          <div className="pt-4 flex items-center gap-3">
            <Link
              href="/"
              className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-medium text-xs font-mono px-4 py-2 rounded-md inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Explore Production Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://github.com/shin486"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-800 hover:bg-zinc-900/90 text-zinc-400 hover:text-zinc-100 font-medium text-xs font-mono px-3.5 py-2 rounded-md inline-flex items-center gap-2 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>github.com/shin486</span>
            </a>
          </div>
        </div>
      </main>

      {/* ================= BOTTOM HUD: TELEMETRY & STUDIO CONTROLS ================= */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 border-t border-zinc-800/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500 backdrop-blur-xs">
        {/* Telemetry Coords & Time */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400/80" />
            <span>
              CUR [ X: {coords.x} | Y: {coords.y} ]
            </span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-400">{timeString}</span>
        </div>

        {/* Center Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-900/70 border border-zinc-800 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-ping" />
          <span>DRAG MOUSE TO ORBIT MATTE CHARCOAL STUDIO</span>
        </div>

        {/* Engine Specs */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400">
            THREE.JS r187
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400 hidden sm:inline">
            WARM STUDIO RIM LIGHT
          </span>
        </div>
      </footer>
    </div>
  );
};
