// Three.js galaxy for the boot screen. Loaded lazily by BootScreen so the
// photo / name / ENTER button can show before this (large) chunk arrives.
import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Phones / low-end CPUs: fewer particles (positions are recomputed in JS
// every frame) and a capped pixel ratio.
const LOW_END = typeof window !== 'undefined' &&
  (window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4);
const QUALITY = LOW_END ? 0.45 : 1;
const scaled = (n) => Math.round(n * QUALITY);

// ─── Shared mouse hook ───
function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const smooth = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return { mouse, smooth };
}

// ─── Galaxy Spiral Particles ───
function GalaxySpiral({ mouse, smooth, warp }) {
  const ref = useRef();
  const count = scaled(4000);
  const arms = 5;

  const { positions, colors, baseAngles, baseRadii, zOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const angles = new Float32Array(count);
    const radii = new Float32Array(count);
    const zOff = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const arm = i % arms;
      const armAngle = (arm / arms) * Math.PI * 2;
      const r = Math.random() * 8 + 0.3;
      const spiralAngle = armAngle + r * 0.6 + (Math.random() - 0.5) * 0.8;
      const scatter = (Math.random() - 0.5) * (0.3 + r * 0.15);

      angles[i] = spiralAngle;
      radii[i] = r;
      zOff[i] = (Math.random() - 0.5) * (0.5 + r * 0.08);

      const x = Math.cos(spiralAngle) * r + scatter;
      const y = Math.sin(spiralAngle) * r + scatter;
      const z = zOff[i];

      const i3 = i * 3;
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Color: hot core (white/cyan) -> cold arms (blue/purple)
      const t = r / 8;
      col[i3] = 0.3 + (1 - t) * 0.7;     // R
      col[i3 + 1] = 0.4 + (1 - t) * 0.5; // G
      col[i3 + 2] = 0.95;                  // B
    }
    return { positions: pos, colors: col, baseAngles: angles, baseRadii: radii, zOffsets: zOff };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;
    const colArr = ref.current.geometry.attributes.color.array;

    smooth.current.lerp(mouse.current, 0.06);
    const mx = smooth.current.x;
    const my = smooth.current.y;

    const warpForce = warp ? Math.min((time % 100) * 3, 15) : 0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = baseRadii[i];
      const angle = baseAngles[i];

      // Rotation speed: inner faster, outer slower (differential rotation)
      const rotSpeed = 0.15 / (r * 0.3 + 0.5);
      const currentAngle = angle + time * rotSpeed;

      // Mouse gravitational lensing
      const gravX = mx * 2;
      const gravY = my * 2;

      let x = Math.cos(currentAngle) * r;
      let y = Math.sin(currentAngle) * r;
      let z = zOffsets[i] + Math.sin(time * 0.5 + r) * 0.1;

      // Gravitational distortion toward mouse
      const dx = gravX - x;
      const dy = gravY - y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.5;
      const pull = 1.5 / (dist * dist);
      x += dx * pull * 0.3;
      y += dy * pull * 0.3;

      if (warp) {
        // Hyperspace: particles stretch toward center then fly outward
        const wDist = Math.sqrt(x * x + y * y) || 0.1;
        x += (x / wDist) * warpForce * 0.5;
        y += (y / wDist) * warpForce * 0.5;
        z += (Math.random() - 0.5) * warpForce * 0.2;

        // Shift colors to white during warp
        const wt = Math.min(warpForce / 10, 1);
        colArr[i3] = 0.3 + wt * 0.7;
        colArr[i3 + 1] = 0.4 + wt * 0.6;
        colArr[i3 + 2] = 0.95 + wt * 0.05;
      }

      arr[i3] = x;
      arr[i3 + 1] = y;
      arr[i3 + 2] = z;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    if (warp) ref.current.geometry.attributes.color.needsUpdate = true;
    ref.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Accretion Disk (bright ring around center) ───
function AccretionDisk({ warp }) {
  const ringRef = useRef();
  const count = scaled(1200);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const r = 1.8 + Math.random() * 0.8;
      const i3 = i * 3;
      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = Math.sin(angle) * r;
      pos[i3 + 2] = (Math.random() - 0.5) * 0.08;
      // Bright cyan/white
      col[i3] = 0.6 + Math.random() * 0.4;
      col[i3 + 1] = 0.8 + Math.random() * 0.2;
      col[i3 + 2] = 1.0;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const time = clock.getElapsedTime();
    ringRef.current.rotation.z = time * 0.8;

    if (warp) {
      const s = Math.max(0, 1 - (time % 100) * 0.5);
      ringRef.current.scale.setScalar(s);
    } else {
      const pulse = 1 + Math.sin(time * 2) * 0.03;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Event Horizon (dark center with glow) ───
function EventHorizon({ warp }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.3;
      if (warp) {
        meshRef.current.scale.setScalar(Math.max(0.01, 1 - (time % 100) * 0.8));
      }
    }
    if (glowRef.current) {
      const pulse = 0.12 + Math.sin(time * 1.5) * 0.04;
      glowRef.current.material.opacity = warp ? pulse * 3 : pulse;
      glowRef.current.scale.setScalar(warp ? 1.5 + Math.sin(time * 5) * 0.5 : 1.2 + Math.sin(time) * 0.1);
    }
  });

  return (
    <group>
      {/* Dark core */}
      <mesh ref={meshRef}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial color="#000005" />
      </mesh>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <ringGeometry args={[1.1, 2.2, 64]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Star Field (distant background stars) ───
function StarField({ warp }) {
  const ref = useRef();
  const count = scaled(2000);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 60;
      pos[i3 + 1] = (Math.random() - 0.5) * 60;
      pos[i3 + 2] = (Math.random() - 0.5) * 30 - 10;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();

    if (warp) {
      // Stars streak toward camera
      const arr = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 2] += 0.5;
        if (arr[i * 3 + 2] > 10) {
          arr[i * 3 + 2] = -20;
          arr[i * 3] = (Math.random() - 0.5) * 60;
          arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }

    ref.current.material.opacity = warp ? 0.3 : 0.5 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Gravitational Lens Rings (mouse-following) ───
function LensRings({ mouse, smooth }) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;
    smooth.current.lerp(mouse.current, 0.04);
    const time = clock.getElapsedTime();

    group.current.position.x = smooth.current.x * 4;
    group.current.position.y = smooth.current.y * 3;

    group.current.children.forEach((child, idx) => {
      const scale = 1 + Math.sin(time * (1 + idx * 0.3) + idx) * 0.15;
      child.scale.setScalar(scale);
      child.rotation.z = time * (0.2 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1);
      child.material.opacity = 0.04 + Math.sin(time * 2 + idx) * 0.02;
    });
  });

  return (
    <group ref={group}>
      {[0.8, 1.3, 1.9].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r, r + 0.02, 64]} />
          <meshBasicMaterial
            color={i === 0 ? '#60a5fa' : i === 1 ? '#8b5cf6' : '#06b6d4'}
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Warp Speed Lines ───
function WarpLines({ active }) {
  const ref = useRef();
  const count = scaled(300);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 6); // line segments: 2 points each
    const col = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 12 + 2;
      const i6 = i * 6;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      // Start point
      pos[i6] = x;
      pos[i6 + 1] = y;
      pos[i6 + 2] = -5;
      // End point (stretched)
      pos[i6 + 3] = x * 0.8;
      pos[i6 + 4] = y * 0.8;
      pos[i6 + 5] = 5;
      // Colors
      col[i6] = 0.5; col[i6 + 1] = 0.7; col[i6 + 2] = 1;
      col[i6 + 3] = 1; col[i6 + 4] = 1; col[i6 + 5] = 1;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = active ? Math.min((clock.getElapsedTime() % 100) * 0.5, 0.6) : 0;
  });

  if (!active) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count * 2} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count * 2} array={colors} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─── Scene ───
function Scene({ warp }) {
  const { mouse, smooth } = useMousePosition();

  return (
    <>
      <StarField warp={warp} />
      <GalaxySpiral mouse={mouse} smooth={smooth} warp={warp} />
      <AccretionDisk warp={warp} />
      <EventHorizon warp={warp} />
      <LensRings mouse={mouse} smooth={smooth} />
      <WarpLines active={warp} />
    </>
  );
}

// ─── Canvas wrapper (default export, lazy-loaded) ───
export default function BootGalaxy({ warp }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={LOW_END ? 1 : [1, 1.5]}
        gl={{ antialias: !LOW_END, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene warp={warp} />
      </Canvas>
    </motion.div>
  );
}
