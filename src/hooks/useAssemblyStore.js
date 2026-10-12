import { useState, useCallback, useRef, useEffect } from 'react';
import { PARTS } from '../data/parts';
import { ASSEMBLY_STEPS } from '../data/assemblySteps';
import { INSTALL_ZONES } from '../data/installationZones';

const INITIAL_INSTALLED = Object.fromEntries(PARTS.map((p) => [p.id, false]));
const INITIAL_POSITIONS = Object.fromEntries(PARTS.map((p) => [p.id, [...p.homePosition]]));

export function useAssemblyStore() {
  const [mode, setMode] = useState('learning'); // 'learning' | 'practice'
  const [installed, setInstalled] = useState({ ...INITIAL_INSTALLED });
  const [positions, setPositions] = useState({ ...INITIAL_POSITIONS });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' | 'error' | 'info'
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [hoveredZoneId, setHoveredZoneId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingPartId, setDraggingPartId] = useState(null);
  const [assemblyComplete, setAssemblyComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setElapsed((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const progress = Math.round(
    (Object.values(installed).filter(Boolean).length / PARTS.length) * 100
  );

  const currentStep = ASSEMBLY_STEPS[currentStepIndex] || ASSEMBLY_STEPS[ASSEMBLY_STEPS.length - 1];

  const showFeedback = useCallback((msg, type = 'info') => {
    setFeedback(msg);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 4000);
  }, []);

  const reset = useCallback(() => {
    setInstalled({ ...INITIAL_INSTALLED });
    setPositions({ ...INITIAL_POSITIONS });
    setCurrentStepIndex(0);
    setMistakes(0);
    setHintsUsed(0);
    setScore(100);
    setFeedback('');
    setSelectedPartId(null);
    setHoveredZoneId(null);
    setIsDragging(false);
    setDraggingPartId(null);
    setAssemblyComplete(false);
    setShowHint(false);
    setIsPoweredOn(false);
    setShowCompletionModal(false);
    setElapsed(0);
    setIsRunning(true);
  }, []);

  const useHint = useCallback(() => {
    setHintsUsed((h) => h + 1);
    setScore((s) => Math.max(0, s - 2));
    setShowHint(true);
      showFeedback('แสดงคำใบ้แล้ว ดูคำแนะนำทางแถบซ้าย', 'info');
  }, [showFeedback]);

  const placePart = useCallback(
    (partId, zoneId) => {
      const part = PARTS.find((p) => p.id === partId);
      const zone = INSTALL_ZONES.find((z) => z.id === zoneId);
      if (!part || !zone) return false;

      const step = ASSEMBLY_STEPS[currentStepIndex];
      if (step?.partId && step.partId !== partId) {
        const nextPart = PARTS.find((item) => item.id === step.partId);
        setPositions((prev) => ({
          ...prev,
          [partId]: [...part.homePosition],
        }));
        showFeedback(
          `ข้ามขั้นตอน: ตอนนี้ต้องติดตั้ง ${nextPart?.name || 'ชิ้นส่วนถัดไป'} ก่อน แล้วจึงติดตั้ง ${part.name}`,
          'info'
        );
        return false;
      }

      const isCorrect = zone.accepts.includes(part.type);

      if (isCorrect) {
        // Snap
        setPositions((prev) => ({
          ...prev,
          [partId]: [...zone.position],
        }));
        const nextInstalled = { ...installed, [partId]: true };
        setInstalled(nextInstalled);
        if (step && step.partId === partId) {
          setCurrentStepIndex((i) => Math.min(i + 1, ASSEMBLY_STEPS.length - 1));
        }
        const allInstalled = PARTS.every((p) => nextInstalled[p.id]);
        if (allInstalled) {
          setAssemblyComplete(true);
          setIsRunning(false);
          showFeedback(
            'ประกอบคอมพิวเตอร์ครบทุกชิ้นแล้ว',
            mode === 'practice' ? 'info' : 'success'
          );
        }
        setScore((s) => Math.min(100, s + 5));
        showFeedback(
          `ติดตั้ง ${part.name} ที่ ${zone.label} เรียบร้อยแล้ว`,
          mode === 'practice' ? 'info' : 'success'
        );
        return true;
      } else {
        // Incorrect
        setMistakes((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
        // Return home
        setPositions((prev) => ({
          ...prev,
          [partId]: [...part.homePosition],
        }));
        showFeedback(
          mode === 'practice'
            ? `ช่องนี้ไม่ใช่ตำแหน่งของ ${part.name} ลองวางในช่องที่ตรงกัน`
            : `ตำแหน่งไม่ถูกต้อง: วาง ${part.name} ที่ ${zone.label} ไม่ได้ ลองใหม่อีกครั้ง`,
          mode === 'practice' ? 'info' : 'error'
        );
        return false;
      }
    },
    [currentStepIndex, installed, mode, showFeedback]
  );

  const returnHome = useCallback((partId) => {
    const part = PARTS.find((p) => p.id === partId);
    if (part) {
      setPositions((prev) => ({
        ...prev,
        [partId]: [...part.homePosition],
      }));
    }
  }, []);

  const updatePosition = useCallback((partId, pos) => {
    setPositions((prev) => ({
      ...prev,
      [partId]: pos,
    }));
  }, []);

  return {
    mode,
    setMode,
    installed,
    positions,
    currentStepIndex,
    currentStep,
    mistakes,
    hintsUsed,
    score,
    feedback,
    feedbackType,
    selectedPartId,
    setSelectedPartId,
    hoveredZoneId,
    setHoveredZoneId,
    isDragging,
    setIsDragging,
    draggingPartId,
    setDraggingPartId,
    assemblyComplete,
    showHint,
    setShowHint,
    elapsed,
    formatTime,
    progress,
    reset,
    useHint,
    placePart,
    returnHome,
    updatePosition,
    showFeedback,
    isPoweredOn,
    powerOn: () => {
      setIsPoweredOn(true);
      setShowCompletionModal(true);
    },
    showCompletionModal,
    setShowCompletionModal,
    PARTS,
    INSTALL_ZONES,
    ASSEMBLY_STEPS,
  };
}
