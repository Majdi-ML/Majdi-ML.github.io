import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import majdiPhoto from '../assets/majdi.png';

// 3D Glowing Orb Component
function GlowingOrb() {
  const meshRef = useRef();
  const particlesRef = useRef();

  // Rotate the orb slowly
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Create particle positions
  const particleCount = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 3 + Math.random() * 2;
      
      temp.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(temp);
  }, []);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
    >
      <group>
        {/* Main Glowing Sphere */}
        <Sphere ref={meshRef} args={[2.5, 64, 64]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            emissive="#6366f1"
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Outer Glow Ring */}
        <Sphere args={[2.9, 32, 32]}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Floating Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            color="#a78bfa"
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

// Main BootScreen Component
export default function BootScreen({ onComplete }) {
  const [isEntering, setIsEntering] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnterClick = () => {
    if (isEntering) {
      return;
    }

    setIsEntering(true);
    timeoutRef.current = setTimeout(() => {
      onComplete();
    }, 1100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2e] to-[#0a0a1a] 
                 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Three.js Canvas for 3D Orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <GlowingOrb />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 mt-[20vh]">
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 200 }}
          className="relative mb-4"
        >
          {/* Animated Ring with Photo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative rounded-full"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #a78bfa, #3b82f6)',
              padding: '5px',
              width: '170px',
              height: '170px',
            }}
          >
            <img 
              src={majdiPhoto} 
              alt="Majdi Melliti" 
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>

          {/* Pulse Effect */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 blur-xl"
          />
        </motion.div>

        {/* Name and Title */}
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-bold text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400
                       tracking-tight"
          >
            Majdi Melliti
          </motion.h1>

          {/* Animated Line Separator */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="text-2xl text-blue-200/80 font-light tracking-wide"
          >
            Data & BI Engineer
          </motion.p>
        </div>

        {/* Enter Button */}
        {!isEntering ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnterClick}
            className="boot-word-button mt-10"
            aria-label="Entrer dans l'expérience"
          >
            <span className="boot-word-box" data-letter="E">E</span>
            <span className="boot-word-box" data-letter="N">N</span>
            <span className="boot-word-box" data-letter="T">T</span>
            <span className="boot-word-box" data-letter="E">E</span>
            <span className="boot-word-box" data-letter="R">R</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full border-4 border-white/20 border-t-blue-400"
            />
            <p className="text-sm text-white/60 tracking-widest uppercase">Chargement...</p>
          </motion.div>
        )}

        {/* Subtle Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5] }}
          transition={{ 
            delay: 1.8,
            duration: 2,
            times: [0, 0.5, 1]
          }}
          className="text-sm text-white/30 mt-4 font-light tracking-widest uppercase"
        >
          Cliquez pour continuer
        </motion.p>
      </div>

      {/* Ambient Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 
                   rounded-full blur-3xl pointer-events-none"
      />
    </motion.div>
  );
}
