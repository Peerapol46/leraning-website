import React from 'react';
import { Edges } from '@react-three/drei';

export default function InstallationZone({ zone, highlighted, valid, neutral, visible }) {
  if (!visible) return null;

  const color = neutral
    ? '#60a5fa'
    : highlighted
      ? valid
        ? '#22c55e'
        : '#ef4444'
      : '#64748b';

  return (
    <group position={zone.position}>
      <mesh>
        <boxGeometry args={zone.size || [0.3, 0.05, 0.3]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={highlighted ? 0.08 : 0.015}
          depthWrite={false}
        />
        <Edges color={color} threshold={15} />
      </mesh>
      {highlighted && (valid || neutral) && (
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
