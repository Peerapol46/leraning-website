import React, { useRef, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import OfficePcCase from './OfficePcCase';
import Part from './Part';
import InstallationZone from './InstallationZone';
import { PARTS } from '../data/parts';
import { INSTALL_ZONES } from '../data/installationZones';

function DragController({
  store,
  orbitRef,
}) {
  const { camera, gl, raycaster, pointer, size } = useThree();
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const intersection = useRef(new THREE.Vector3());
  const offset = useRef(new THREE.Vector3());
  const dragPlaneY = useRef(0);
  const dragPartId = useRef(null);

  const findNearestZone = useCallback((pos, partId) => {
    const part = PARTS.find((candidate) => candidate.id === partId);
    const candidates = INSTALL_ZONES.map((zone) => ({
      zone,
      distance: Math.hypot(pos.x - zone.position[0], pos.z - zone.position[2]),
    }));
    const withinReach = candidates.filter(({ distance }) => distance < 0.55);

    // Prefer a compatible snap point when several zones share the same area.
    const compatible = withinReach
      .filter(({ zone }) => zone.accepts.includes(part?.type))
      .sort((a, b) => a.distance - b.distance)[0];
    if (compatible) return compatible.zone;

    return withinReach.sort((a, b) => a.distance - b.distance)[0]?.zone ?? null;
  }, []);

  const onPointerDown = useCallback(
    (e, partId) => {
      if (store.installed[partId]) return;
      e.stopPropagation();
      dragPartId.current = partId;
      store.setDraggingPartId(partId);
      store.setIsDragging(true);
      store.setSelectedPartId(partId);
      if (orbitRef.current) orbitRef.current.enabled = false;

      // Compute offset on a horizontal plane at current Y
      const partPos = new THREE.Vector3(...store.positions[partId]);
      dragPlaneY.current = partPos.y;
      plane.current.set(new THREE.Vector3(0, 1, 0), -dragPlaneY.current);
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(plane.current, intersection.current)) {
        offset.current.copy(intersection.current).sub(partPos);
      } else {
        offset.current.set(0, 0, 0);
      }
      document.body.style.cursor = 'grabbing';
    },
    [store, orbitRef, camera, raycaster, pointer]
  );

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!dragPartId.current) return;
      const partId = dragPartId.current;
      // Normalize pointer
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera({ x: nx, y: ny }, camera);
      plane.current.set(new THREE.Vector3(0, 1, 0), -dragPlaneY.current);
      if (raycaster.ray.intersectPlane(plane.current, intersection.current)) {
        const newPos = intersection.current.clone().sub(offset.current);
        // Clamp roughly
        newPos.x = Math.max(-4, Math.min(4, newPos.x));
        newPos.z = Math.max(-3, Math.min(3, newPos.z));
        newPos.y = Math.max(-1.2, Math.min(2, newPos.y));
        store.updatePosition(partId, [newPos.x, newPos.y, newPos.z]);

        const nearest = findNearestZone(newPos, partId);
        if (nearest) {
          store.setHoveredZoneId(nearest.id);
        } else {
          store.setHoveredZoneId(null);
        }
      }
    };

    const onPointerUp = () => {
      if (!dragPartId.current) return;
      const partId = dragPartId.current;
      const pos = new THREE.Vector3(...store.positions[partId]);
      const nearest = findNearestZone(pos, partId);

      if (nearest) {
        store.placePart(partId, nearest.id);
      } else {
        store.returnHome(partId);
        store.showFeedback('Component returned to starting position. Drop near an installation zone.', 'info');
      }

      dragPartId.current = null;
      store.setDraggingPartId(null);
      store.setIsDragging(false);
      store.setHoveredZoneId(null);
      if (orbitRef.current) orbitRef.current.enabled = true;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [store, camera, raycaster, gl, findNearestZone, orbitRef]);

  return (
    <>
      <OfficePcCase
        key="empty-chassis-v2"
        installed={store.installed}
        positions={store.positions}
        onPartPointerDown={onPointerDown}
      />
      {PARTS.map((part) => (
        <Part
          key={part.id}
          part={part}
          position={store.positions[part.id]}
          installed={store.installed[part.id]}
          selected={store.selectedPartId === part.id}
          isDragging={store.draggingPartId === part.id}
          onPointerDown={onPointerDown}
        />
      ))}
      {INSTALL_ZONES.map((zone) => {
        const isHovered = store.hoveredZoneId === zone.id;
        const part = store.draggingPartId
          ? PARTS.find((p) => p.id === store.draggingPartId)
          : null;
        const valid = part ? zone.accepts.includes(part.type) : false;
        // Show zones more in learning mode or when dragging
        const visible =
          store.mode === 'learning' ||
          store.isDragging ||
          (store.mode === 'practice' && isHovered);
        return (
          <InstallationZone
            key={zone.id}
            zone={zone}
            highlighted={isHovered}
            valid={valid}
            visible={visible || store.mode === 'learning'}
          />
        );
      })}
    </>
  );
}

function SceneContent({ store }) {
  const orbitRef = useRef();

  return (
    <>
      <PerspectiveCamera makeDefault position={[6.9, 6.2, -1.2]} fov={48} />

      {/* Enhanced lighting for realistic look */}
      <ambientLight intensity={0.55} color="#e8e8f0" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        color="#ffffff"
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#b0c4de" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" distance={8} />
      <pointLight position={[-2, 1, 0]} intensity={0.2} color="#a0a0ff" distance={6} />
      <pointLight position={[3, 1.2, 0.3]} intensity={1.1} color="#dbeafe" distance={7} />

      {/* Hemisphere light for subtle sky/ground color variation */}
      <hemisphereLight
        args={['#87ceeb', '#444', 0.3]}
      />

      <DragController store={store} orbitRef={orbitRef} />

      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.5}
        scale={14}
        blur={2.5}
        far={4}
        color="#1a1a2e"
      />

      {/* Subtle floor grid for spatial reference */}
      <Grid
        position={[0, -0.55, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#333355"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#444466"
        fadeDistance={12}
        fadeStrength={1}
        infiniteGrid
      />

      <OrbitControls
        ref={orbitRef}
        target={[1.25, 0, 0]}
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

export default function Scene({ store }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 10, 25]} />
        <SceneContent store={store} />
      </Canvas>
    </div>
  );
}
