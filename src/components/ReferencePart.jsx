import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { prepareOfficePcModel } from './officePcModel';

const OFFICE_PARTS = {
  ram: ['ram_LP_pc_mat_0', 'ram2_LP_pc_mat_0'],
  cooler: ['cooler_LP_pc_mat_0'],
  motherboard: ['motherboard_LP_pc_mat_0', 'motherboard_detail_LP_pc_mat_0'],
  psu: ['powersupply_LP_pc_mat_0'],
  gpu: ['gpu_LP_pc_mat_0'],
};

const SSD_PARTS = ['SSD_Case_1_0', 'SSD_Case_2_0', 'SSD_Board_0', 'SSD_Screws_0'];

function readableMaterial(material) {
  const copy = material.clone();
  if (copy.emissive) {
    copy.emissive.set('#101820');
    copy.emissiveIntensity = 0.12;
  }
  return copy;
}

function cloneMaterials(material) {
  return Array.isArray(material)
    ? material.map(readableMaterial)
    : readableMaterial(material);
}

function extractOfficePart(scene, type) {
  const model = prepareOfficePcModel(scene);
  const names = OFFICE_PARTS[type];
  const nodes = [];
  model.traverse((node) => {
    if (node.isMesh && names.includes(node.name)) nodes.push(node);
  });
  if (!nodes.length) return [];

  // The motherboard mesh is the anchor; its detail mesh is already positioned
  // correctly relative to it in the source model.
  const anchorName = type === 'motherboard' ? 'motherboard_LP_pc_mat_0' : names[0];
  const anchor = nodes.find((node) => node.name === anchorName) || nodes[0];
  const anchorBounds = new THREE.Box3().setFromObject(anchor);
  const center = anchorBounds.getCenter(new THREE.Vector3());

  return nodes.map((node) => {
    const geometry = node.geometry.clone();
    geometry.applyMatrix4(node.matrixWorld);
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.computeBoundingSphere();
    return { geometry, material: cloneMaterials(node.material) };
  });
}

function extractSsdPart(scene, targetLength) {
  // The SSD file is rigged for an exploded animation. Its mesh vertices share
  // one assembled layout, so retain those coordinates and omit the rig offsets.
  const rotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
  const meshes = [];
  scene.traverse((node) => {
    if (node.isMesh && SSD_PARTS.includes(node.name)) {
      const geometry = node.geometry.clone();
      geometry.applyMatrix4(rotation);
      geometry.computeBoundingBox();
      meshes.push({ geometry, material: cloneMaterials(node.material) });
    }
  });
  if (!meshes.length) return [];

  const bounds = new THREE.Box3();
  meshes.forEach(({ geometry }) => bounds.union(geometry.boundingBox));
  const center = bounds.getCenter(new THREE.Vector3());
  const dimensions = bounds.getSize(new THREE.Vector3());
  const uniformScale = targetLength / Math.max(dimensions.x, 0.001);

  return meshes.map(({ geometry, material }) => {
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(uniformScale, uniformScale, uniformScale);
    geometry.computeBoundingSphere();
    return { geometry, material };
  });
}

export default function ReferencePart({ type, size }) {
  const modelUrl = type === 'ssd' ? '/ssd_solid-state_drive.glb' : '/office_pc.glb';
  const { scene } = useGLTF(modelUrl);
  const meshes = useMemo(
    () => type === 'ssd'
      ? extractSsdPart(scene, size[0])
      : extractOfficePart(scene, type),
    [scene, size, type],
  );

  return meshes.map(({ geometry, material }, index) => (
    <mesh
      key={`${type}-${index}`}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  ));
}

useGLTF.preload('/office_pc.glb');
useGLTF.preload('/ssd_solid-state_drive.glb');
