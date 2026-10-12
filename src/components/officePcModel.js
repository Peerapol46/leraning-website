import * as THREE from 'three';

const CASE_PARTS = /^(skeleton|upperwall|frontwall|frontpanel|backpanel|backwall|grid|misc|logo|boltiki|detalka)/i;
const ASSEMBLY_PARTS = /^(gpu|cooler|powersupply|motherboard|ram)/i;

/** Apply the same rotation, scale, and origin to the chassis and its components. */
export function prepareOfficePcModel(sourceScene) {
  const model = sourceScene.clone(true);
  model.rotation.z = Math.PI / 2;
  model.updateMatrixWorld(true);

  const bounds = new THREE.Box3();
  model.traverse((node) => {
    if (!node.isMesh || !CASE_PARTS.test(node.name) || /^cover/i.test(node.name)) return;
    bounds.union(new THREE.Box3().setFromObject(node));
  });

  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const scale = 2.5 / Math.max(size.x, size.z);
  model.position.set(
    -center.x * scale,
    -bounds.min.y * scale + 0.02,
    -center.z * scale,
  );
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);
  return model;
}

export function isChassisMesh(name) {
  return CASE_PARTS.test(name) && !/^cover/i.test(name) && !ASSEMBLY_PARTS.test(name);
}
