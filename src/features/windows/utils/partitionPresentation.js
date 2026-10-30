// Keep the internal Unallocated state for partition operations, but leave Type blank.
export const partitionTypeLabel = (partition) => partition.type === 'Unallocated' ? '' : partition.type
