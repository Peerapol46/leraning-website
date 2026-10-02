# Computer Assembly Prototype

Interactive 3D Learning Web Application for computer assembly practice.

## Technology Stack

- React 18
- Vite 5
- Three.js
- React Three Fiber
- @react-three/drei

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Features (Milestone 1 — Assembly Simulation)

- Interactive 3D workspace with orbit controls (rotate / zoom)
- Drag-and-drop computer components
- Multiple installation zones (correct + incorrect)
- Correct / incorrect placement detection
- Snap system on correct drop
- Component locking after install
- Learning Mode (hints, zone guidance)
- Practice Mode (fewer hints, mistake tracking)
- Score, timer, progress, reset
- Assembly completion validation + Power On button
- Error Boundary for 3D canvas failures

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── ErrorBoundary.jsx
│   ├── Scene.jsx
│   ├── ComputerCase.jsx
│   ├── Part.jsx
│   ├── InstallationZone.jsx
│   ├── AssemblyPanel.jsx
│   ├── ComponentPanel.jsx
│   └── TopNav.jsx
├── data/
│   ├── parts.js
│   ├── installationZones.js
│   └── assemblySteps.js
└── hooks/
    └── useAssemblyStore.js
```

## Usage

1. Select Learning or Practice mode.
2. Click and hold a component on the left side of the 3D scene.
3. Drag toward an installation zone inside the open case / motherboard.
4. Release to attempt installation.
5. Correct placements snap and lock; incorrect ones return home and count as mistakes.
6. Complete all 8 components, then click Power On.

Windows Installation Simulation is planned for the next development phase.

## 3D Model Attribution

The PC case geometry in `public/models/office.pc.glb` includes **Office PC** by fluffyw0lf, from [Sketchfab](https://sketchfab.com/3d-models/office-pc-69188a48a0b04b18aa015719b0551eaa), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The model was rotated, scaled, and its component visibility is controlled by the assembly simulation.
