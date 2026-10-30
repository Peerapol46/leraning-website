export function isInstallTarget(partition, windowsPartitionId) {
  return Boolean(partition && partition.id === windowsPartitionId && partition.type === 'Primary' && partition.drive === 0)
}

export function isValidPartitionSize(dialog, size) {
  const limit = dialog?.type === 'extend' ? dialog.freeSpace?.total : dialog?.partition?.total
  return Boolean(dialog?.partition && Number.isInteger(size) && size > 0 && Number.isFinite(limit) && size <= limit)
}
