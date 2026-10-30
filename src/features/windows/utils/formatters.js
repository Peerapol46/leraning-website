export const formatProductKey = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 25).match(/.{1,5}/g)?.join('-') ?? ''

export const formatSize = (mb) => mb >= 1024
  ? (mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1) + ' GB'
  : mb + ' MB'
export const formatPartitionSize = (mb) => mb >= 1024
  ? (mb / 1024).toFixed(1) + ' GB'
  : mb.toFixed(1) + ' MB'


