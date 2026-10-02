import React from 'react';

export default function ComputerCase() {
  return (
    <group>
      {/* ═══════ Bottom panel ═══════ */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[2.5, 0.06, 2.1]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.45} roughness={0.55} />
      </mesh>
      {/* Bottom rubber feet */}
      {[[-1.0, -0.9], [-1.0, 0.9], [1.0, -0.9], [1.0, 0.9]].map(([x, z], i) => (
        <mesh key={`foot-${i}`} position={[x, -1.14, z]}>
          <cylinderGeometry args={[0.06, 0.07, 0.03, 12]} />
          <meshStandardMaterial color="#111" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}

      {/* ═══════ Left panel (closed, tempered glass) ═══════ */}
      <mesh position={[-1.25, 0, 0]}>
        <boxGeometry args={[0.04, 2.2, 2.0]} />
        <meshStandardMaterial
          color="#2a2a32"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* ═══════ Right panel (open side - visible interior) ═══════ */}
      {/* Right side frame rails */}
      <mesh position={[1.25, 1.04, 0]}>
        <boxGeometry args={[0.04, 0.12, 2.0]} />
        <meshStandardMaterial color="#2a2a32" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[1.25, -1.04, 0]}>
        <boxGeometry args={[0.04, 0.12, 2.0]} />
        <meshStandardMaterial color="#2a2a32" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[1.25, 0, -0.95]}>
        <boxGeometry args={[0.04, 2.2, 0.1]} />
        <meshStandardMaterial color="#2a2a32" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh position={[1.25, 0, 0.95]}>
        <boxGeometry args={[0.04, 2.2, 0.1]} />
        <meshStandardMaterial color="#2a2a32" metalness={0.5} roughness={0.45} />
      </mesh>

      {/* ═══════ Front panel ═══════ */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[2.44, 2.14, 0.06]} />
        <meshStandardMaterial color="#222230" metalness={0.35} roughness={0.6} />
      </mesh>
      {/* Front panel mesh area (air intake) */}
      <mesh position={[0, 0.15, 1.08]}>
        <boxGeometry args={[1.8, 1.2, 0.01]} />
        <meshStandardMaterial color="#181820" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Front mesh lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`fmesh-${i}`} position={[0, -0.35 + i * 0.1, 1.086]}>
          <boxGeometry args={[1.7, 0.02, 0.005]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.4} roughness={0.55} />
        </mesh>
      ))}
      {/* Power button */}
      <mesh position={[0.8, 0.95, 1.085]}>
        <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
        <meshStandardMaterial color="#444" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Power LED ring */}
      <mesh position={[0.8, 0.95, 1.093]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.025, 0.004, 6, 16]} />
        <meshStandardMaterial
          color="#22cc44"
          emissive="#22cc44"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* USB ports on front top */}
      {[0.5, 0.6].map((x, i) => (
        <mesh key={`usb-f-${i}`} position={[x, 0.95, 1.082]}>
          <boxGeometry args={[0.04, 0.015, 0.015]} />
          <meshStandardMaterial color="#1a6fd4" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Audio jack on front */}
      <mesh position={[0.35, 0.95, 1.085]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ═══════ Rear panel ═══════ */}
      <mesh position={[0, 0, -1.05]}>
        <boxGeometry args={[2.44, 2.14, 0.04]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.45} roughness={0.5} />
      </mesh>
      {/* Rear I/O cutout */}
      <mesh position={[0, 0.5, -1.07]}>
        <boxGeometry args={[1.4, 0.14, 0.01]} />
        <meshStandardMaterial color="#0d0d12" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Expansion slot covers */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`exp-${i}`} position={[0, 0.15 - i * 0.1, -1.07]}>
          <boxGeometry args={[0.5, 0.06, 0.01]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.5} roughness={0.45} />
        </mesh>
      ))}
      {/* Rear exhaust fan hole */}
      <mesh position={[0.6, 0.3, -1.07]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.01, 20]} />
        <meshStandardMaterial color="#111118" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Rear fan grille pattern */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`rfg-${i}`} position={[0.6, 0.3, -1.075]}>
          <torusGeometry args={[0.05 + i * 0.035, 0.004, 4, 16]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
      {/* PSU cutout on rear */}
      <mesh position={[0, -0.85, -1.07]}>
        <boxGeometry args={[0.8, 0.4, 0.01]} />
        <meshStandardMaterial color="#0d0d12" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* ═══════ Motherboard tray (standoff plate) ═══════ */}
      <mesh position={[0.1, -0.05, 0]}>
        <boxGeometry args={[2.0, 0.025, 1.6]} />
        <meshStandardMaterial color="#4b4b58" metalness={0.4} roughness={0.45} />
      </mesh>
      {/* Standoffs */}
      {[
        [-0.6, 0.5], [-0.6, -0.5], [0, 0.5], [0, -0.5],
        [0.6, 0.5], [0.6, -0.5], [-0.6, 0], [0, 0], [0.6, 0],
      ].map(([x, z], i) => (
        <mesh key={`stoff-${i}`} position={[x, 0.0, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 6]} />
          <meshStandardMaterial color="#c9a227" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}

      {/* ═══════ PSU shroud (bottom cover) ═══════ */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[2.44, 0.04, 2.0]} />
        <meshStandardMaterial color="#1e1e28" metalness={0.4} roughness={0.55} />
      </mesh>
      {/* PSU shroud front vent */}
      <mesh position={[0.3, -0.9, 0.6]}>
        <boxGeometry args={[0.6, 0.2, 0.02]} />
        <meshStandardMaterial color="#151520" metalness={0.35} roughness={0.6} />
      </mesh>

      {/* ═══════ Drive cage ═══════ */}
      <mesh position={[-0.9, -0.9, -0.4]}>
        <boxGeometry args={[0.45, 0.55, 0.65]} />
        <meshStandardMaterial color="#252530" metalness={0.35} roughness={0.6} />
      </mesh>
      {/* Drive bay slots */}
      {[0, 1, 2].map((i) => (
        <mesh key={`dbay-${i}`} position={[-0.9, -0.75 + i * 0.18, -0.4]}>
          <boxGeometry args={[0.43, 0.02, 0.63]} />
          <meshStandardMaterial color="#1e1e28" metalness={0.3} roughness={0.65} />
        </mesh>
      ))}

      {/* ═══════ Cable management holes ═══════ */}
      {[0.3, -0.1, -0.5].map((z, i) => (
        <group key={`cable-${i}`}>
          <mesh position={[-0.6, 0.1, z]}>
            <boxGeometry args={[0.08, 0.25, 0.04]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Rubber grommet */}
          <mesh position={[-0.6, 0.1, z]}>
            <boxGeometry args={[0.09, 0.26, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ═══════ Front intake fans (behind mesh) ═══════ */}
      {[-0.3, 0.3].map((y, i) => (
        <group key={`ffan-${i}`}>
          <mesh position={[0, y, 0.98]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 20]} />
            <meshStandardMaterial color="#111118" metalness={0.2} roughness={0.7} />
          </mesh>
          {/* Fan hub */}
          <mesh position={[0, y, 0.99]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
            <meshStandardMaterial color="#222" metalness={0.4} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ═══════ Rear exhaust fan ═══════ */}
      <mesh position={[0.6, 0.3, -1.02]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        <meshStandardMaterial color="#111118" metalness={0.2} roughness={0.7} />
      </mesh>
    </group>
  );
}
