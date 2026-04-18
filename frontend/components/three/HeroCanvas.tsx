"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared geometry and material instances — created ONCE, reused by all meshes
const sharedIcosahedron = new THREE.IcosahedronGeometry(1.2, 0);
const sharedOctahedron = new THREE.OctahedronGeometry(1.5, 0);
const matBeige = new THREE.MeshBasicMaterial({ color: '#D4C5B0', wireframe: true, transparent: true, opacity: 0.35 });
const matGold = new THREE.MeshBasicMaterial({ color: '#C9A96E', wireframe: true, transparent: true, opacity: 0.25 });

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const arr = [];
    const geometries = [sharedIcosahedron, sharedOctahedron];
    const materials = [matBeige, matGold];

    // Reduced from 30 to 15 shapes — halves draw calls with minimal visual difference
    for (let i = 0; i < 15; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 20 - 15
        ),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        speed: (Math.random() * 0.003) + 0.001,
        geom: geometries[Math.floor(Math.random() * geometries.length)],
        mat: materials[Math.floor(Math.random() * materials.length)]
      });
    }
    return arr;
  }, []);

  const shapeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    shapeRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += shapes[i].speed;
        mesh.rotation.y += shapes[i].speed;
      }
    });
  });

  useEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: '200px top',
        scrub: true,
        onUpdate: (self) => {
          if (groupRef.current) {
            groupRef.current.position.z = -self.progress * 40;
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { shapeRefs.current[i] = el; }}
          position={s.position}
          rotation={s.rotation}
          geometry={s.geom}
          material={s.mat}
        />
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)' }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 hero-canvas-wrapper" id="hero-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
