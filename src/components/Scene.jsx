import React, { useRef, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ComputerCase from './ComputerCase';
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
  const dragPartId = useRef(null);

  const findNearestZone = useCallback(
    (pos) => {
      let nearest = null;
      let minDist = 0.55;
      for (const zone of INSTALL_ZONES) {
        // Skip zones that require parent not installed yet for some cases
        const dist = pos.distanceTo(new THREE.Vector3(...zone.position));
        if (dist < minDist) {
          minDist = dist;
          nearest = zone;
        }
      }
      return nearest;
    },
    []
  );

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
      plane.current.set(new THREE.Vector3(0, 1, 0), -partPos.y);
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane.current, intersection.current);
      offset.current.copy(intersection.current).sub(partPos);
      document.body.style.cursor = 'grabbing';
    },
    [store, orbitRef, camera, raycaster, pointer]
  );

  useEffect(() => {
    const onPointerMove = (event) => {
      if (!dragPartId.current) return;
      const partId = dragPartId.current;
      // Normalize pointer
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      // Account for canvas position roughly - for simplicity use full window; better with bounds
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera({ x: nx, y: ny }, camera);
      const partPos = new THREE.Vector3(...store.positions[partId]);
      plane.current.set(new THREE.Vector3(0, 1, 0), -partPos.y);
      if (raycaster.ray.intersectPlane(plane.current, intersection.current)) {
        const newPos = intersection.current.clone().sub(offset.current);
        // Clamp roughly
        newPos.x = Math.max(-4, Math.min(4, newPos.x));
        newPos.z = Math.max(-3, Math.min(3, newPos.z));
        newPos.y = Math.max(-1.2, Math.min(2, newPos.y));
        store.updatePosition(partId, [newPos.x, newPos.y, newPos.z]);

        const nearest = findNearestZone(newPos);
        if (nearest) {
          const part = PARTS.find((p) => p.id === partId);
          const valid = nearest.accepts.includes(part?.type);
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
      const nearest = findNearestZone(pos);

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
      <PerspectiveCamera makeDefault position={[0, 5, 4]} fov={42} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 8, 4]} intensity={1.2} castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 6, -3]} intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#e8f0ff" />

      <ComputerCase />
      <DragController store={store} orbitRef={orbitRef} />

      <ContactShadows position={[0, -0.16, 0]} opacity={0.5} scale={14} blur={2} />
      <OrbitControls
        ref={orbitRef}
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function Scene({ store }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true }}>
        <SceneContent store={store} />
      </Canvas>
    </div>
  );
}
