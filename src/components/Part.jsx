import React, { useRef, useState } from 'react';

function CpuMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.32, 0.04, 0.32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.28, 0.04, 0.28]} />
        <meshStandardMaterial
          color={selected || hovered ? '#e0e0e0' : color}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.11, 0.045, -0.11]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.02, 0.01, 3]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
    </group>
  );
}

function RamMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.65, 0.12, 0.04]} />
        <meshStandardMaterial
          color={selected || hovered ? '#4a90d9' : color}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
      {[-0.22, -0.08, 0.08, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 0.025]}>
          <boxGeometry args={[0.1, 0.06, 0.01]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
      <mesh position={[0, -0.055, 0]}>
        <boxGeometry args={[0.62, 0.01, 0.035]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function M2Mesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.45, 0.02, 0.12]} />
        <meshStandardMaterial
          color={selected || hovered ? '#3dd68c' : color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {[-0.12, 0.05].map((x, i) => (
        <mesh key={i} position={[x, 0.015, 0]}>
          <boxGeometry args={[0.12, 0.01, 0.08]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <mesh position={[-0.21, 0, 0]}>
        <boxGeometry args={[0.04, 0.015, 0.1]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} />
      </mesh>
    </group>
  );
}

function CoolerMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.4]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.14 + i * 0.04, 0.05, 0]}>
          <boxGeometry args={[0.02, 0.25, 0.35]} />
          <meshStandardMaterial color="#aaa" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
        <meshStandardMaterial
          color={selected || hovered ? '#5b9bd5' : color}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

function MotherboardMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.7, 0.04, 1.3]} />
        <meshStandardMaterial
          color={selected || hovered ? '#2ecc71' : color}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      <mesh position={[0.15, 0.03, 0.15]}>
        <boxGeometry args={[0.35, 0.02, 0.35]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {[0.35, 0.2, 0.05, -0.1].map((z, i) => (
        <mesh key={i} position={[0.55, 0.05, z]}>
          <boxGeometry args={[0.12, 0.08, 0.06]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <mesh position={[0, 0.03, -0.55]}>
        <boxGeometry args={[0.9, 0.02, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.4, 0.03, -0.2]}>
        <boxGeometry args={[0.2, 0.03, 0.2]} />
        <meshStandardMaterial color="#444" metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0.62]}>
        <boxGeometry args={[1.4, 0.12, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function PsuMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.75, 0.45, 0.85]} />
        <meshStandardMaterial
          color={selected || hovered ? '#3d3846' : color}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0, -0.43]}>
        <boxGeometry args={[0.6, 0.3, 0.02]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}

function SsdMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.55, 0.06, 0.35]} />
        <meshStandardMaterial
          color={selected || hovered ? '#ff8c42' : color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.4, 0.005, 0.25]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  );
}

function GpuMesh({ color, selected, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.1, 0.25, 0.45]} />
        <meshStandardMaterial
          color={selected || hovered ? '#e01b24' : color}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      {[-0.3, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 12]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <mesh position={[0, -0.1, 0.2]}>
        <boxGeometry args={[0.7, 0.04, 0.08]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <boxGeometry args={[1.05, 0.02, 0.4]} />
        <meshStandardMaterial color="#333" metalness={0.6} />
      </mesh>
    </group>
  );
}

const MESH_MAP = {
  cpu: CpuMesh,
  ram: RamMesh,
  m2: M2Mesh,
  cooler: CoolerMesh,
  motherboard: MotherboardMesh,
  psu: PsuMesh,
  ssd: SsdMesh,
  gpu: GpuMesh,
};

export default function Part({
  part,
  position,
  installed,
  selected,
  isDragging,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}) {
  const [hovered, setHovered] = useState(false);
  const MeshComp = MESH_MAP[part.type] || CpuMesh;

  const handleOver = (e) => {
    e.stopPropagation();
    if (!installed) {
      setHovered(true);
      document.body.style.cursor = 'grab';
      onPointerOver?.(part.id);
    }
  };

  const handleOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
    onPointerOut?.(part.id);
  };

  const handleDown = (e) => {
    e.stopPropagation();
    if (!installed) {
      onPointerDown?.(e, part.id);
    }
  };

  return (
    <group
      position={position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onPointerDown={handleDown}
    >
      <MeshComp color={part.color} selected={selected} hovered={hovered || isDragging} />
      {(selected || hovered || isDragging) && !installed && (
        <mesh scale={[1.08, 1.08, 1.08]}>
          <boxGeometry args={[0.4, 0.15, 0.4]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.35} />
        </mesh>
      )}
    </group>
  );
}
