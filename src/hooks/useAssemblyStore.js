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
    setElapsed(0);
    setIsRunning(true);
  }, []);

  const useHint = useCallback(() => {
    setHintsUsed((h) => h + 1);
    setScore((s) => Math.max(0, s - 2));
    setShowHint(true);
    showFeedback('Hint revealed. Check the left panel.', 'info');
  }, [showFeedback]);

  const placePart = useCallback(
    (partId, zoneId) => {
      const part = PARTS.find((p) => p.id === partId);
      const zone = INSTALL_ZONES.find((z) => z.id === zoneId);
      if (!part || !zone) return false;

      const isCorrect = zone.accepts.includes(part.type);

      if (isCorrect) {
        const nextInstalled = { ...installed, [partId]: true };

        // Snap
        setPositions((prev) => ({
          ...prev,
          [partId]: [...zone.position],
        }));
        setInstalled(nextInstalled);

        // Point to the first component that is still missing, even if earlier
        // components were installed out of order.
        const nextStepIndex = ASSEMBLY_STEPS.findIndex(
          (step) => step.partId && !nextInstalled[step.partId]
        );
        setCurrentStepIndex(
          nextStepIndex === -1 ? ASSEMBLY_STEPS.length - 2 : nextStepIndex
        );

        const allInstalled = PARTS.every((candidate) => nextInstalled[candidate.id]);
        if (allInstalled) {
          setAssemblyComplete(true);
          setIsRunning(false);
          showFeedback('✓ Computer Assembly Completed Successfully', 'success');
        }
        setScore((s) => Math.min(100, s + 5));
        showFeedback(`✓ Correct! The ${part.name} has been installed in the ${zone.label}.`, 'success');
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
          `✕ Incorrect location. The ${part.name} cannot be installed in ${zone.label}.`,
          'error'
        );
        return false;
      }
    },
    [installed, showFeedback]
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
    PARTS,
    INSTALL_ZONES,
    ASSEMBLY_STEPS,
  };
}
