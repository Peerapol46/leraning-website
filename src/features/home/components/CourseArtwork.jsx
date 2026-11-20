import React from 'react'
import computerImage from '../../../assets/images/computer.jpg'
import windowsImage from '../../../assets/images/windows.jpg'
import pretestImage from '../../../assets/images/Explorebasicknowledge.jpg'
import posttestImage from '../../../assets/images/havelearned.jpg'

export default function CourseArtwork({ type, hero = false }) {
  const photo = {
    pretest: { src: pretestImage, alt: 'แบบทดสอบสำรวจความรู้พื้นฐานก่อนเรียน' },
    posttest: { src: posttestImage, alt: 'ทบทวนสิ่งที่ได้เรียนรู้และทดสอบความรู้หลังเรียน' },
    hardware: { src: computerImage, alt: 'อุปกรณ์และชุดประกอบคอมพิวเตอร์' },
    windows: { src: windowsImage, alt: 'การติดตั้ง Windows จาก USB บนเครื่องคอมพิวเตอร์' },
  }[type]
  if (photo) return <img className="tutor-course-photo" src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width="1536" height="1024" />
  return <svg viewBox="0 0 520 340" className={`lab-art lab-art-${type}`} fill="none" aria-hidden="true">
    <rect x="58" y="48" width="404" height="242" rx="12" fill="currentColor" opacity=".08" />
    {type === 'lesson' ? <>
      <rect x="135" y="65" width="250" height="210" rx="10" fill="white" stroke="#2563eb" strokeWidth="5" />
      <rect x="155" y="85" width="70" height="24" rx="4" fill="#dbeafe" />
      <path d="M165 97h50" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <path d="M155 125h210M155 145h210M155 165h150M155 195h210M155 215h180M155 235h120" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="345" cy="97" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
      <path d="M341 97l3 3 6-6" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </> : type === 'hardware' ? <>
      <rect x="114" y="83" width="209" height="139" rx="8" fill="white" stroke="#273c52" strokeWidth="6" />
      <rect x="125" y="94" width="187" height="113" rx="2" fill="#dce9e6" />
      <path d="M191 222v25h54v-25M170 253h97" stroke="#273c52" strokeWidth="6" strokeLinecap="round" />
      <rect x="344" y="98" width="68" height="155" rx="7" fill="#fff" stroke="#273c52" strokeWidth="6" />
      <path d="M358 117h39M358 131h39M358 145h39" stroke="#c3ced5" strokeWidth="4" />
      <circle cx="378" cy="225" r="7" fill="#c05232" />
      <rect x="174" y="122" width="62" height="58" rx="6" fill="#2e645b" />
      <rect x="190" y="138" width="30" height="26" rx="2" fill="#fff" opacity=".8" />
      <path d="M164 131h-15m15 13h-15m15 13h-15m97-26h15m-15 13h15m-15 13h15" stroke="#2e645b" strokeWidth="4" />
    </> : type === 'windows' ? <>
      <rect x="107" y="77" width="305" height="190" rx="8" fill="white" stroke="#273c52" strokeWidth="5" />
      <path d="M107 105h305" stroke="#dce2e8" strokeWidth="3" />
      <circle cx="123" cy="91" r="3" fill="#c05232" /><circle cx="135" cy="91" r="3" fill="#c7b99c" />
      <path d="M208 139h46v44h-46zm53 0h46v44h-46zm-53 51h46v44h-46zm53 0h46v44h-46z" fill="#3a6e94" />
    </> : <>
      <rect x="154" y="59" width="215" height="224" rx="10" fill="white" stroke="#273c52" strokeWidth="5" />
      <rect x="211" y="47" width="101" height="26" rx="6" fill="#273c52" />
      {[114, 164, 214].map((y, i) => <g key={y}><rect x="182" y={y} width="23" height="23" rx="4" fill="currentColor" opacity=".15" /><path d={`M219 ${y + 7}h115m-115 11h79`} stroke="#c3ced5" strokeWidth="5" strokeLinecap="round" />{(type === 'posttest' || i === 0) && <path d={`M187 ${y + 11}l5 5 9-10`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />}</g>)}
    </>}
    {hero && <><path d="M82 274h355" stroke="#273c52" strokeWidth="3" strokeLinecap="round" /><rect x="69" y="190" width="92" height="48" rx="5" fill="#fff" stroke="#dce2e8" strokeWidth="2" /><text x="87" y="220" fill="#273c52" fontSize="20" fontFamily="sans-serif" fontWeight="700">PC LAB</text></>}
  </svg>
}

