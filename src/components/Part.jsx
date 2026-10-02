import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

/* ─────────────── CPU ─────────────── */
function CpuMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Substrate (green PCB bottom) */}
      <mesh position={[0, -0.025, 0]}>
        <boxGeometry args={[0.34, 0.02, 0.34]} />
        <meshStandardMaterial color="#1a5e1a" metalness={0.1} roughness={0.85} />
      </mesh>
      {/* Gold contact pads array (bottom) */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <mesh
            key={`pad-${row}-${col}`}
            position={[-0.1 + col * 0.04, -0.036, -0.1 + row * 0.04]}
          >
            <boxGeometry args={[0.025, 0.002, 0.025]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
        ))
      )}
      {/* IHS (Integrated Heat Spreader) — main silver top */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.30, 0.025, 0.30]} />
        <meshStandardMaterial
          color={active ? '#e8e8e8' : '#b8b8c0'}
          metalness={0.92}
          roughness={0.12}
        />
      </mesh>
      {/* IHS inner die area (slightly recessed look) */}
      <mesh position={[0, 0.028, 0]}>
        <boxGeometry args={[0.14, 0.002, 0.14]} />
        <meshStandardMaterial color="#a0a0a8" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Text/branding engraving area */}
      <mesh position={[0.02, 0.029, -0.05]}>
        <boxGeometry args={[0.12, 0.001, 0.04]} />
        <meshStandardMaterial color="#909098" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Alignment triangle marker */}
      <mesh position={[-0.12, 0.029, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.015, 0.01, 3]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.3} />
      </mesh>
      {/* Edge chamfer accents */}
      {[[-0.155, 0], [0.155, 0], [0, -0.155], [0, 0.155]].map(([x, z], i) => (
        <mesh key={`edge-${i}`} position={[x, 0.015, z]}>
          <boxGeometry args={[x !== 0 ? 0.005 : 0.31, 0.024, z !== 0 ? 0.005 : 0.31]} />
          <meshStandardMaterial color="#8a8a92" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── RAM ─────────────── */
function RamMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main PCB */}
      <mesh>
        <boxGeometry args={[0.65, 0.14, 0.02]} />
        <meshStandardMaterial
          color={active ? '#1a6fd4' : '#0d4a8f'}
          metalness={0.15}
          roughness={0.75}
        />
      </mesh>
      {/* Heat spreader (top decorative strip) */}
      <mesh position={[0, 0.055, 0]}>
        <boxGeometry args={[0.65, 0.035, 0.025]} />
        <meshStandardMaterial
          color={active ? '#4a90d9' : '#2563a8'}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Heat spreader ridge/fin on top */}
      <mesh position={[0, 0.076, 0]}>
        <boxGeometry args={[0.55, 0.008, 0.018]} />
        <meshStandardMaterial color="#1e5090" metalness={0.65} roughness={0.25} />
      </mesh>
      {/* DRAM chips (8 black chips on front) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-f-${i}`} position={[-0.26 + i * 0.075, 0, 0.012]}>
          <boxGeometry args={[0.055, 0.06, 0.006]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
        </mesh>
      ))}
      {/* DRAM chips (8 black chips on back) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`chip-b-${i}`} position={[-0.26 + i * 0.075, 0, -0.012]}>
          <boxGeometry args={[0.055, 0.06, 0.006]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
        </mesh>
      ))}
      {/* Gold contact pins (bottom edge) */}
      <mesh position={[0, -0.072, 0]}>
        <boxGeometry args={[0.62, 0.008, 0.018]} />
        <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.08} />
      </mesh>
      {/* Individual gold pin lines */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={`pin-${i}`} position={[-0.29 + i * 0.02, -0.072, 0]}>
          <boxGeometry args={[0.008, 0.01, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}
      {/* Notch (key slot) */}
      <mesh position={[0.08, -0.068, 0]}>
        <boxGeometry args={[0.025, 0.015, 0.025]} />
        <meshStandardMaterial color="#0d4a8f" metalness={0.15} roughness={0.75} />
      </mesh>
      {/* Brand label area */}
      <mesh position={[-0.15, 0.02, 0.013]}>
        <boxGeometry args={[0.12, 0.025, 0.002]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ─────────────── M.2 SSD ─────────────── */
function M2Mesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main PCB */}
      <mesh>
        <boxGeometry args={[0.45, 0.015, 0.12]} />
        <meshStandardMaterial
          color={active ? '#3dd68c' : '#1a8f4e'}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      {/* NAND flash chip 1 */}
      <mesh position={[-0.08, 0.01, 0]}>
        <boxGeometry args={[0.1, 0.008, 0.08]} />
        <meshStandardMaterial color="#111" metalness={0.25} roughness={0.85} />
      </mesh>
      {/* NAND flash chip 2 */}
      <mesh position={[0.08, 0.01, 0]}>
        <boxGeometry args={[0.1, 0.008, 0.08]} />
        <meshStandardMaterial color="#111" metalness={0.25} roughness={0.85} />
      </mesh>
      {/* Controller chip */}
      <mesh position={[-0.16, 0.01, 0]}>
        <boxGeometry args={[0.05, 0.008, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Gold connector edge */}
      <mesh position={[-0.215, 0, 0]}>
        <boxGeometry args={[0.025, 0.012, 0.1]} />
        <meshStandardMaterial color="#c9a227" metalness={0.92} roughness={0.08} />
      </mesh>
      {/* Thermal pad / label on top */}
      <mesh position={[0.05, 0.012, 0]}>
        <boxGeometry args={[0.28, 0.002, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.05} roughness={0.95} />
      </mesh>
      {/* Screw notch */}
      <mesh position={[0.215, 0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Small SMD components */}
      {[-0.03, 0.02, 0.06].map((x, i) => (
        <mesh key={`smd-${i}`} position={[x, 0.01, 0.04]}>
          <boxGeometry args={[0.012, 0.005, 0.008]} />
          <meshStandardMaterial color="#333" metalness={0.4} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── CPU Cooler ─────────────── */
function CoolerMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Copper base plate (contacts CPU) */}
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[0.35, 0.04, 0.35]} />
        <meshStandardMaterial color="#b87333" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Heat pipes (4 copper pipes going up) */}
      {[-0.06, -0.02, 0.02, 0.06].map((x, i) => (
        <mesh key={`hp-${i}`} position={[x, 0.0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#c27840" metalness={0.88} roughness={0.15} />
        </mesh>
      ))}
      {/* Aluminium fin stack (many thin plates) */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={`fin-${i}`} position={[0, -0.05 + i * 0.018, 0]}>
          <boxGeometry args={[0.38, 0.008, 0.34]} />
          <meshStandardMaterial
            color={active ? '#c8c8d0' : '#a8a8b0'}
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>
      ))}
      {/* Fan housing (circle) */}
      <mesh position={[0, 0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
        <meshStandardMaterial
          color={active ? '#4a8fd9' : '#2a3f6f'}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      {/* Fan hub */}
      <mesh position={[0, 0.12, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Fan blades */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return (
          <mesh
            key={`blade-${i}`}
            position={[
              Math.cos(angle) * 0.1,
              0.12,
              0.22 + Math.sin(angle) * 0.005,
            ]}
            rotation={[Math.PI / 2, angle + 0.3, 0]}
          >
            <boxGeometry args={[0.12, 0.005, 0.04]} />
            <meshStandardMaterial
              color={active ? '#5a9fe9' : '#3a5f8f'}
              metalness={0.2}
              roughness={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
      {/* Mounting clips */}
      {[[-0.19, -0.14, 0], [0.19, -0.14, 0]].map(([x, y, z], i) => (
        <mesh key={`clip-${i}`} position={[x, y, z]}>
          <boxGeometry args={[0.02, 0.06, 0.3]} />
          <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── Motherboard ─────────────── */
function MotherboardMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main PCB */}
      <mesh>
        <boxGeometry args={[1.7, 0.035, 1.3]} />
        <meshStandardMaterial
          color={active ? '#2ecc71' : '#1a6b3a'}
          metalness={0.08}
          roughness={0.85}
        />
      </mesh>

      {/* CPU Socket area (square with lever) */}
      <mesh position={[0.15, 0.025, 0.15]}>
        <boxGeometry args={[0.4, 0.02, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* CPU Socket inner */}
      <mesh position={[0.15, 0.036, 0.15]}>
        <boxGeometry args={[0.32, 0.005, 0.32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Socket lever */}
      <mesh position={[0.36, 0.04, 0.15]}>
        <boxGeometry args={[0.02, 0.02, 0.28]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* DIMM slots (4 parallel) */}
      {[0.35, 0.2, 0.05, -0.1].map((z, i) => (
        <group key={`dimm-${i}`}>
          <mesh position={[0.55, 0.025, z]}>
            <boxGeometry args={[0.08, 0.025, 0.65 * 0.15]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#1a1a1a' : '#2d2d2d'}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
          {/* Slot clips */}
          <mesh position={[0.55, 0.04, z + 0.04]}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0.55, 0.04, z - 0.04]}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* PCIe x16 slot */}
      <mesh position={[0, 0.025, -0.5]}>
        <boxGeometry args={[0.85, 0.02, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* PCIe x16 clip */}
      <mesh position={[-0.43, 0.035, -0.5]}>
        <boxGeometry args={[0.02, 0.015, 0.05]} />
        <meshStandardMaterial color="#ccc" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* PCIe x1 slot */}
      <mesh position={[0.3, 0.025, -0.65]}>
        <boxGeometry args={[0.25, 0.015, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* M.2 slot */}
      <mesh position={[-0.2, 0.025, -0.3]}>
        <boxGeometry args={[0.5, 0.01, 0.05]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Chipset heatsink */}
      <mesh position={[-0.4, 0.045, -0.2]}>
        <boxGeometry args={[0.22, 0.04, 0.22]} />
        <meshStandardMaterial color="#444" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Chipset heatsink fins */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`chf-${i}`} position={[-0.4, 0.07, -0.28 + i * 0.04]}>
          <boxGeometry args={[0.2, 0.008, 0.025]} />
          <meshStandardMaterial color="#555" metalness={0.65} roughness={0.3} />
        </mesh>
      ))}

      {/* VRM heatsink (top) */}
      <mesh position={[0.15, 0.045, 0.58]}>
        <boxGeometry args={[1.2, 0.04, 0.08]} />
        <meshStandardMaterial color="#505050" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* I/O shield area (rear ports) */}
      <mesh position={[0, 0.055, 0.62]}>
        <boxGeometry args={[1.4, 0.1, 0.06]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* I/O port openings */}
      {[-0.5, -0.35, -0.2, -0.05, 0.1, 0.25, 0.4, 0.55].map((x, i) => (
        <mesh key={`io-${i}`} position={[x, 0.055, 0.625]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}

      {/* SATA ports */}
      {[-0.55, -0.45, -0.35].map((x, i) => (
        <mesh key={`sata-${i}`} position={[x, 0.03, -0.55]}>
          <boxGeometry args={[0.04, 0.02, 0.035]} />
          <meshStandardMaterial color="#e02020" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* 24-pin ATX power connector */}
      <mesh position={[0.78, 0.04, 0.1]}>
        <boxGeometry args={[0.06, 0.04, 0.28]} />
        <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* 8-pin CPU power connector */}
      <mesh position={[0.15, 0.04, 0.6]}>
        <boxGeometry args={[0.08, 0.03, 0.04]} />
        <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Mounting holes */}
      {[[-0.8, 0.55], [-0.8, -0.55], [0.8, 0.55], [0.8, -0.55], [0, 0.55], [0, -0.55]].map(
        ([x, z], i) => (
          <mesh key={`mh-${i}`} position={[x, 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      )}

      {/* PCB trace lines (decorative) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`trace-${i}`} position={[0.3, 0.019, -0.2 + i * 0.08]}>
          <boxGeometry args={[0.3, 0.001, 0.003]} />
          <meshStandardMaterial color="#2a8a4a" metalness={0.1} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── PSU ─────────────── */
function PsuMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.75, 0.45, 0.85]} />
        <meshStandardMaterial
          color={active ? '#3d3846' : '#1a1a22'}
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>
      {/* Top panel (slightly different shade) */}
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[0.75, 0.005, 0.85]} />
        <meshStandardMaterial color="#252530" metalness={0.45} roughness={0.5} />
      </mesh>
      {/* Fan grille (top) — honeycomb pattern approximation */}
      <mesh position={[0, 0.234, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.004, 24]} />
        <meshStandardMaterial color="#111" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Fan grille rings */}
      {[0.18, 0.14, 0.1, 0.06].map((r, i) => (
        <mesh key={`ring-${i}`} position={[0, 0.236, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.004, 4, 24]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
      {/* Rear panel (where cables come out) */}
      <mesh position={[0, 0, -0.426]}>
        <boxGeometry args={[0.74, 0.44, 0.005]} />
        <meshStandardMaterial color="#0d0d12" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* AC inlet */}
      <mesh position={[-0.15, 0.08, -0.43]}>
        <boxGeometry args={[0.1, 0.08, 0.01]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Power switch */}
      <mesh position={[-0.15, -0.02, -0.43]}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
        <meshStandardMaterial color="#e02020" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Modular cable ports (bottom rear) */}
      {[0.05, 0.15, 0.25].map((x, i) => (
        <mesh key={`port-${i}`} position={[x, -0.08, -0.43]}>
          <boxGeometry args={[0.06, 0.04, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Brand label */}
      <mesh position={[0, 0, 0.426]}>
        <boxGeometry args={[0.4, 0.15, 0.002]} />
        <meshStandardMaterial color="#2a2a35" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* PSU rating label */}
      <mesh position={[0.15, -0.1, 0.427]}>
        <boxGeometry args={[0.2, 0.06, 0.001]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Side ventilation slots */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`vent-${i}`} position={[0.376, -0.1 + i * 0.06, 0]}>
          <boxGeometry args={[0.003, 0.03, 0.6]} />
          <meshStandardMaterial color="#333" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
      {/* Screws on rear panel */}
      {[[-0.32, 0.18], [0.32, 0.18], [-0.32, -0.18], [0.32, -0.18]].map(([x, y], i) => (
        <mesh key={`scr-${i}`} position={[x, y, -0.43]}>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 6]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── SATA SSD ─────────────── */
function SsdMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main body (aluminium casing) */}
      <mesh>
        <boxGeometry args={[0.55, 0.06, 0.38]} />
        <meshStandardMaterial
          color={active ? '#ff8c42' : '#d06820'}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      {/* Top label area */}
      <mesh position={[0, 0.031, 0]}>
        <boxGeometry args={[0.48, 0.002, 0.32]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.05} roughness={0.95} />
      </mesh>
      {/* Brand accent stripe */}
      <mesh position={[0, 0.032, -0.05]}>
        <boxGeometry args={[0.45, 0.001, 0.04]} />
        <meshStandardMaterial color="#e02020" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* SATA data connector */}
      <mesh position={[-0.23, -0.01, -0.19]}>
        <boxGeometry args={[0.06, 0.02, 0.015]} />
        <meshStandardMaterial color="#222" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* SATA power connector */}
      <mesh position={[-0.14, -0.01, -0.19]}>
        <boxGeometry args={[0.08, 0.02, 0.015]} />
        <meshStandardMaterial color="#222" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Mounting screw holes (bottom) */}
      {[[-0.2, -0.12], [-0.2, 0.12], [0.2, -0.12], [0.2, 0.12]].map(([x, z], i) => (
        <mesh key={`sh-${i}`} position={[x, -0.031, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.005, 6]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Edge seam line */}
      <mesh position={[0, 0, -0.191]}>
        <boxGeometry args={[0.54, 0.058, 0.002]} />
        <meshStandardMaterial color="#b85a18" metalness={0.45} roughness={0.45} />
      </mesh>
    </group>
  );
}

/* ─────────────── GPU ─────────────── */
function GpuMesh({ color, selected, hovered }) {
  const active = selected || hovered;
  return (
    <group>
      {/* Main shroud/body */}
      <mesh>
        <boxGeometry args={[1.15, 0.08, 0.48]} />
        <meshStandardMaterial
          color={active ? '#e01b24' : '#8b1118'}
          metalness={0.35}
          roughness={0.45}
        />
      </mesh>
      {/* Backplate (top) */}
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[1.15, 0.005, 0.48]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Fan shroud decorative top */}
      <mesh position={[0, -0.045, 0]}>
        <boxGeometry args={[1.15, 0.005, 0.48]} />
        <meshStandardMaterial
          color={active ? '#d01b24' : '#6b0e12'}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>

      {/* Triple fan setup */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <group key={`fan-assembly-${i}`}>
          {/* Fan housing */}
          <mesh position={[x, -0.055, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.02, 20]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Fan hub */}
          <mesh position={[x, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.025, 12]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* Fan blades */}
          {Array.from({ length: 9 }).map((_, j) => {
            const angle = (j / 9) * Math.PI * 2;
            return (
              <mesh
                key={`fb-${i}-${j}`}
                position={[
                  x + Math.cos(angle) * 0.08,
                  -0.06,
                  Math.sin(angle) * 0.08,
                ]}
                rotation={[Math.PI / 2, angle + 0.4, 0]}
              >
                <boxGeometry args={[0.09, 0.004, 0.025]} />
                <meshStandardMaterial
                  color="#2a2a2a"
                  metalness={0.2}
                  roughness={0.6}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* PCB visible edge (green strip on bottom) */}
      <mesh position={[0, 0, 0.245]}>
        <boxGeometry args={[1.1, 0.06, 0.01]} />
        <meshStandardMaterial color="#1a5e1a" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Gold PCIe connector (bottom edge) */}
      <mesh position={[0.1, -0.02, 0.25]}>
        <boxGeometry args={[0.7, 0.03, 0.008]} />
        <meshStandardMaterial color="#c9a227" metalness={0.92} roughness={0.08} />
      </mesh>

      {/* Bracket (rear I/O) */}
      <mesh position={[-0.58, 0, -0.22]}>
        <boxGeometry args={[0.02, 0.1, 0.06]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Display ports */}
      {[0, 0.05, 0.1].map((y, i) => (
        <mesh key={`dp-${i}`} position={[-0.59, -0.02 + y * 0.6, -0.22]}>
          <boxGeometry args={[0.005, 0.015, 0.025]} />
          <meshStandardMaterial color="#222" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* HDMI port */}
      <mesh position={[-0.59, 0.025, -0.22]}>
        <boxGeometry args={[0.005, 0.018, 0.03]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Power connector (top side) */}
      <mesh position={[0.45, 0.05, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.06]} />
        <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Second power connector */}
      <mesh position={[0.35, 0.05, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.06]} />
        <meshStandardMaterial color="#f5f5dc" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* RGB accent strip (emissive) */}
      <mesh position={[0, -0.043, -0.235]}>
        <boxGeometry args={[1.0, 0.008, 0.005]} />
        <meshStandardMaterial
          color={active ? '#ff4444' : '#cc2222'}
          emissive={active ? '#ff2222' : '#881111'}
          emissiveIntensity={active ? 0.8 : 0.3}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Heatsink fins visible from side */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`hf-${i}`} position={[-0.5 + i * 0.09, 0, -0.244]}>
          <boxGeometry args={[0.015, 0.06, 0.005]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── Mesh Map ─────────────── */
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

const MODEL_BACKED_PARTS = new Set(['motherboard', 'ram', 'm2', 'cooler', 'psu', 'gpu', 'ssd']);

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

  // These parts use the real geometry extracted from the GLB in OfficePcCase.
  if (MODEL_BACKED_PARTS.has(part.type)) return null;

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
