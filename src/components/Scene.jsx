import React, { useRef, useCallback, useEffect, useState } from 'react';
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
  const draggedPosition = useRef(new THREE.Vector3());
  const dragPartId = useRef(null);

  const findNearestZone = useCallback(
    (pos, partId) => {
      const part = PARTS.find((item) => item.id === partId);
      const distanceXZ = (zone) => Math.hypot(
        pos.x - zone.position[0],
        pos.z - zone.position[2],
      );
      const snapRadius = (zone) => {
        const [width, , depth] = zone.size || [0.3, 0.05, 0.3];
        return Math.max(0.5, Math.hypot(width / 2, depth / 2) + 0.15);
      };

      // Prefer the matching installation point. This also avoids the CPU and
      // cooler competing for their nearby, intentionally shared socket center.
      const matchingZones = INSTALL_ZONES.filter((zone) => zone.accepts.includes(part?.type));
      let nearest = null;
      let minDist = Infinity;
      for (const zone of matchingZones) {
        const dist = distanceXZ(zone);
        if (dist < snapRadius(zone) && dist < minDist) {
          minDist = dist;
          nearest = zone;
        }
      }
      if (nearest) return nearest;

      // Keep wrong-zone feedback in practice mode, using the nearest target.
      minDist = 0.55;
      for (const zone of INSTALL_ZONES) {
        const dist = distanceXZ(zone);
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
      draggedPosition.current.copy(partPos);
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
        newPos.z = Math.max(-3, Math.min(5.5, newPos.z));
        newPos.y = Math.max(-1.2, Math.min(2, newPos.y));
        draggedPosition.current.copy(newPos);
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
      const pos = draggedPosition.current.clone();
      const nearest = findNearestZone(pos, partId);

      if (nearest) {
        store.placePart(partId, nearest.id);
      } else {
        store.returnHome(partId);
        store.showFeedback('ชิ้นส่วนกลับไปที่เดิมแล้ว ลองปล่อยใกล้กรอบตำแหน่งติดตั้ง', 'info');
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
          store.isDragging ||
          (store.mode === 'learning' && zone.id === store.currentStep?.zoneId) ||
          (store.mode === 'practice' && isHovered);
        return (
          <InstallationZone
            key={zone.id}
            zone={zone}
            highlighted={isHovered}
            valid={valid}
            neutral={store.mode === 'practice'}
            visible={visible}
          />
        );
      })}
    </>
  );
}

function SceneContent({ store }) {
  const orbitRef = useRef();
  const { size } = useThree();
  const isSmallViewport = size.width <= 900;
  // While loose parts are spread out, orbit around their shared presentation
  // area. After assembly, orbit around the case itself so the finished build
  // stays centered when the user tilts or rotates the view.
  const orbitTarget = store.assemblyComplete ? [0, 0, 0] : [0, 0, 2.1];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0.5, 8.8, 2.1]} fov={42} />
      <ambientLight intensity={0.9} />
      <hemisphereLight skyColor="#dbeafe" groundColor="#64748b" intensity={0.8} />
      <directionalLight position={[3, 8, 4]} intensity={1.6} castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 6, -3]} intensity={0.75} />
      <pointLight position={[0, 3, 0]} intensity={0.45} color="#e8f0ff" />

      <ComputerCase />
      <DragController store={store} orbitRef={orbitRef} />

      {!isSmallViewport && (
        <ContactShadows position={[0, -0.16, 0]} opacity={0.5} scale={14} blur={2} />
      )}
      <OrbitControls
        ref={orbitRef}
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.05}
        target={orbitTarget}
      />
    </>
  );
}

export default function Scene({ store }) {
  const [isSmallViewport, setIsSmallViewport] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const updateViewport = () => setIsSmallViewport(window.innerWidth <= 900);
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows={!isSmallViewport}
        dpr={isSmallViewport ? 1 : [1, 1.5]}
        frameloop="demand"
        gl={{ antialias: !isSmallViewport }}
      >
        <SceneContent store={store} />
      </Canvas>
    </div>
  );
}
