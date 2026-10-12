// These centers use the office_pc.glb's own component transforms after the
// chassis is laid flat and normalized. Snapped parts therefore return to their
// original assembled positions in the reference model.
export const INSTALL_ZONES = [
  {
    id: 'mb_tray',
    label: 'ถาดเมนบอร์ด',
    position: [0.2414, 0.5282, 0.5072],
    accepts: ['motherboard'],
    size: [1.82, 0.28, 1.36],
    parent: 'case',
  },
  {
    id: 'cpu_socket',
    label: 'ช่อง CPU',
    position: [-0.1399, 0.39, 0.504],
    accepts: ['cpu'],
    size: [0.36, 0.12, 0.36],
    parent: 'motherboard',
  },
  {
    id: 'dimm_a2',
    label: 'ช่อง RAM',
    position: [-0.1399, 0.5655, 0.1272],
    accepts: ['ram'],
    size: [0.78, 0.2, 0.16],
    parent: 'motherboard',
  },
  {
    id: 'cooler_mount',
    label: 'ตำแหน่งชุดระบายความร้อน',
    position: [-0.1409, 0.5793, 0.5043],
    accepts: ['cooler'],
    size: [0.62, 0.4, 0.62],
    parent: 'motherboard',
  },
  {
    id: 'psu_bay',
    label: 'ช่องชุดจ่ายไฟ (PSU)',
    position: [-0.907, 0.7753, 0.7918],
    accepts: ['psu'],
    size: [0.55, 0.84, 0.85],
    parent: 'case',
  },
  {
    id: 'ssd_bay_1',
    label: 'ช่อง SSD',
    position: [-0.88, 0.55, -0.78],
    accepts: ['ssd'],
    size: [0.7, 0.08, 0.54],
    parent: 'case',
  },
  {
    id: 'pcie_x16',
    label: 'ช่องการ์ดจอ PCIe x16',
    position: [0.539, 0.7642, 0.486],
    accepts: ['gpu'],
    size: [0.28, 0.64, 1.45],
    parent: 'motherboard',
  },
];

export const ZONE_MAP = Object.fromEntries(INSTALL_ZONES.map((z) => [z.id, z]));
