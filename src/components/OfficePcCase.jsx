import React, { useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

const MODEL_PARTS = {
  motherboard: ['motherboard_LP', 'motherboard_detail_LP'],
  ram: ['ram_LP'],
  cooler: ['cooler_LP'],
  psu: ['powersupply_LP'],
  gpu: ['gpu_LP'],
  // GLTFLoader strips punctuation/spaces from duplicate node names at runtime.
  m2: ['Cube_3001'],
  ssd: ['Samsung_Evo_860_2'],
};

const DUPLICATE_MODELS = [
  'Sketchfab_model003',
  'Sketchfab_model004',
  'Sketchfab_model005',
];

// Only these groups form the outer chassis. The skeleton mesh contains the
// preassembled interior, so it must stay hidden while parts are being installed.
const CASE_NODES = new Set([
  'backpanel_LP',
  'backwall_LP',
  'boltiki_LP',
  'cover_LP',
  'frontpanel_LP',
  'frontwall_LP',
  'grid_LP',
  'logo_LP',
  'skeleton_LP',
  'upperwall_LP',
]);

export default function OfficePcCase({ installed, positions, onPartPointerDown }) {
  const { scene } = useGLTF('/models/office.pc.glb');

  const model = useMemo(() => {
    const root = scene.clone(true);

    // Lay the tower on its side so the motherboard faces upward through the open side.
    root.rotation.z = Math.PI / 2;
    root.updateMatrixWorld(true);

    const motherboard = root.getObjectByName('motherboard_LP');
    if (!motherboard) return { root, parts: {} };

    const boardBounds = new THREE.Box3().setFromObject(motherboard);
    const boardSize = boardBounds.getSize(new THREE.Vector3());
    const scale = Math.min(1.7 / boardSize.x, 1.3 / boardSize.z);
    root.scale.setScalar(scale);
    root.updateMatrixWorld(true);

    boardBounds.setFromObject(motherboard);
    const boardCenter = boardBounds.getCenter(new THREE.Vector3());
    root.position.set(-boardCenter.x, 0.05 - boardCenter.y, -boardCenter.z);
    root.updateMatrixWorld(true);

    // This export includes a second complete PC and duplicate storage models.
    // Keep one case and one copy of each interactive component.
    DUPLICATE_MODELS.forEach((name) => {
      const duplicate = root.getObjectByName(name);
      if (duplicate) duplicate.visible = false;
    });

    const parts = {};
    Object.entries(MODEL_PARTS).forEach(([partId, nodeNames]) => {
      const partRoot = new THREE.Group();
      let found = false;

      nodeNames.forEach((nodeName) => {
        const source = root.getObjectByName(nodeName);
        if (!source) return;

        source.updateWorldMatrix(true, true);
        const detached = source.clone(true);
        // Preserve the imported world transform after taking the part out of its case parent.
        detached.matrix.copy(source.matrixWorld);
        detached.matrixAutoUpdate = false;
        detached.matrixWorld.copy(source.matrixWorld);
        detached.matrixWorldNeedsUpdate = false;
        partRoot.add(detached);

        source.visible = false;
        found = true;
      });

      if (!found) return;

      // The SSD was authored standing on its edge; lay its thin axis flat like a 2.5-inch drive.
      if (partId === 'ssd') partRoot.rotation.z = Math.PI / 2;

      partRoot.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(partRoot);
      parts[partId] = {
        object: partRoot,
        center: bounds.getCenter(new THREE.Vector3()),
      };
    });

    const caseRoot = root.getObjectByName('RootNode');
    if (caseRoot) {
      caseRoot.children.forEach((node) => {
        node.visible = CASE_NODES.has(node.name);
      });
    }

    // The assembly lesson installs one RAM module, so keep the second stick hidden.
    const secondRam = root.getObjectByName('ram2_LP');
    if (secondRam) secondRam.visible = false;

    // Ignore a stray detached mesh included in the Blender export.
    const detachedMesh = root.getObjectByName('Object_10');
    if (detachedMesh) detachedMesh.visible = false;

    root.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    Object.values(parts).forEach(({ object }) => {
      object.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    });

    return { root, parts };
  }, [scene]);

  useLayoutEffect(() => {
    // Reassert the empty-case visibility after GLTF load and React Fast Refresh.
    const caseRoot = model.root.getObjectByName('RootNode');
    if (caseRoot) {
      caseRoot.children.forEach((node) => {
        node.visible = CASE_NODES.has(node.name);
      });
    }

    DUPLICATE_MODELS.forEach((name) => {
      const duplicate = model.root.getObjectByName(name);
      if (duplicate) duplicate.visible = false;
    });

    Object.values(MODEL_PARTS).flat().forEach((name) => {
      const component = model.root.getObjectByName(name);
      if (component) component.visible = false;
    });
  }, [model]);

  return (
    <>
      <primitive object={model.root} dispose={null} />
      {Object.entries(model.parts).map(([partId, part]) => {
        const target = new THREE.Vector3(...(positions[partId] ?? [0, 0, 0]));
        const offset = target.sub(part.center);
        const handlePointerDown = installed[partId]
          ? undefined
          : (event) => onPartPointerDown?.(event, partId);

        return (
          <group
            key={partId}
            position={offset.toArray()}
            onPointerDown={handlePointerDown}
          >
            <primitive object={part.object} dispose={null} />
          </group>
        );
      })}
    </>
  );
}

useGLTF.preload('/models/office.pc.glb');
