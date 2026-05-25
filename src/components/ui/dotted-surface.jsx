import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export function DottedSurface({ className, ...props }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adjust grid size and separation based on screen width
    const SEPARATION = isMobile ? 180 : 150;
    const AMOUNTX = isMobile ? 25 : 40;
    const AMOUNTY = isMobile ? 35 : 60;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Using a subtle light gray fog matching our brand-light-gray (#f5f5f7)
    scene.fog = new THREE.Fog(0xf5f5f7, 1500, 7000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    
    // Position camera to view from a premium 3D angle
    camera.position.set(0, 400, 1100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);

    container.appendChild(renderer.domElement);

    // Create particles geometry
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0; // Initial Y position
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    // Material with subtle graphite gray (#1c1c1e) for dots
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(0x1c1c1e),
      size: isMobile ? 4.5 : 5.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    // Create points object
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    // Animation function - slow, smooth waves
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;

          // Animate Y position with subtle, low-amplitude sine waves
          positions[index + 1] =
            Math.sin((ix + count) * 0.2) * 20 +
            Math.sin((iy + count) * 0.3) * 20;

          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      
      // Speed is slow (0.015) for premium, fluid feeling
      count += 0.015;
    };

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Render once if static to avoid black screens or outdated aspects
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize);

    // Run animation or render single static frame depending on settings
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Store references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      animationId,
    };

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        if (sceneRef.current.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });

        sceneRef.current.renderer.dispose();

        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      {...props}
    />
  );
}
