import React from 'react';

export default function ComputerCase() {
  return (
    <group>
      {/* Bottom panel (base of the laid-flat case) */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[2.6, 0.06, 2.2]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-1.3, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.55, 2.2]} />
        <meshStandardMaterial color="#252530" metalness={0.35} roughness={0.65} />
      </mesh>

      {/* Right wall */}
      <mesh position={[1.3, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.55, 2.2]} />
        <meshStandardMaterial color="#252530" metalness={0.35} roughness={0.65} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.15, -1.1]}>
        <boxGeometry args={[2.6, 0.55, 0.06]} />
        <meshStandardMaterial color="#1e1e28" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Front wall (shorter, like a lip) */}
      <mesh position={[0, 0.05, 1.1]}>
        <boxGeometry args={[2.6, 0.35, 0.06]} />
        <meshStandardMaterial color="#222230" metalness={0.35} roughness={0.65} />
      </mesh>

      {/* Motherboard tray / standoff plate (flat, slightly raised) */}
      <mesh position={[0.15, -0.1, -0.05]}>
        <boxGeometry args={[1.9, 0.03, 1.6]} />
        <meshStandardMaterial color="#2d2d38" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Standoff pegs on the tray */}
      {[
        [-0.6, 0.5], [-0.6, -0.5], [0.6, 0.5], [0.6, -0.5],
        [0, 0.5], [0, -0.5], [0, 0],
        [-0.6, 0], [0.6, 0],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x + 0.15, -0.07, z - 0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
          <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* PSU compartment divider */}
      <mesh position={[-0.85, 0.05, 0]}>
        <boxGeometry args={[0.03, 0.35, 2.0]} />
        <meshStandardMaterial color="#2a2a35" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Drive cage area */}
      <mesh position={[-1.05, 0.0, 0.5]}>
        <boxGeometry args={[0.4, 0.25, 0.7]} />
        <meshStandardMaterial color="#28283200" transparent opacity={0.3} />
      </mesh>

      {/* Rear I/O cutout indicator */}
      <mesh position={[0.15, 0.15, -1.07]}>
        <boxGeometry args={[1.4, 0.15, 0.02]} />
        <meshStandardMaterial color="#111118" />
      </mesh>

      {/* Expansion slot covers (rear) */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh key={`slot-${i}`} position={[-0.25 + i * 0.12, 0.05, -1.07]}>
          <boxGeometry args={[0.08, 0.35, 0.02]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
