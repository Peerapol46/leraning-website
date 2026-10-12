import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { isChassisMesh, prepareOfficePcModel } from './officePcModel';

const MODEL_URL = '/office_pc.glb';

export default function ComputerCase() {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => {
    const chassis = prepareOfficePcModel(scene);
    chassis.traverse((node) => {
      if (!node.isMesh) return;
      node.visible = isChassisMesh(node.name);
      if (!node.visible) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const brighten = (material) => {
        const copy = material.clone();
        if (copy.emissive) {
          copy.emissive.set('#172235');
          copy.emissiveIntensity = 0.22;
        }
        return copy;
      };
      node.material = Array.isArray(node.material)
        ? node.material.map(brighten)
        : brighten(node.material);
    });
    return chassis;
  }, [scene]);

  return <primitive object={model} />;
}

useGLTF.preload(MODEL_URL);
