import React from 'react';

export default function InstallationZone({ zone, highlighted, valid, visible }) {
  if (!visible) return null;

  const color = highlighted
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
          opacity={highlighted ? 0.45 : 0.15}
          depthWrite={false}
        />
      </mesh>
      {highlighted && valid && (
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
