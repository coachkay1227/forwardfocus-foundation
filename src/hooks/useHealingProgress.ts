import { useState, useEffect } from 'react';

interface HealingProgress {
  daysStrong: number;
  toolsUsed: number;
  checkIns: number;
  startDate: string | null;
  lastCheckIn: string | null;
  moodHistory: Array<{ date: string; mood: number }>;
  milestonesEarned: string[];
}

const defaultProgress: HealingProgress = {
  daysStrong: 0,
  toolsUsed: 0,
  checkIns: 0,
  startDate: null,
  lastCheckIn: null,
  moodHistory: [],
  milestonesEarned: []
};

export const useHealingProgress = () => {
  const [progress, setProgress] = useState<HealingProgress>(defaultProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('healingHubProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      
      // Calculate days strong based on start date
      if (parsed.startDate) {
        const startDate = new Date(parsed.startDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        parsed.daysStrong = diffDays;
      }
      
      setProgress(parsed);
    } else {
      // Initialize with start date if this is first time
      const initialProgress = {
        ...defaultProgress,
        startDate: new Date().toISOString(),
        daysStrong: 1
      };
      setProgress(initialProgress);
      localStorage.setItem('healingHubProgress', JSON.stringify(initialProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress.startDate) {
      localStorage.setItem('healingHubProgress', JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (action: 'mood_check' | 'affirmation_view' | 'breathing_exercise' | 'frequency_use' | 'grounding_technique') => {
    setProgress(prev => ({
      ...prev,
      toolsUsed: prev.toolsUsed + 1
    }));
  };

  const checkIn = (moodValue: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProgress(prev => {
      // Don't increment if already checked in today
      const alreadyCheckedToday = prev.lastCheckIn === today;
      
      const newMoodHistory = [...prev.moodHistory];
      const existingIndex = newMoodHistory.findIndex(entry => entry.date === today);
      
      if (existingIndex >= 0) {
        newMoodHistory[existingIndex] = { date: today, mood: moodValue };
      } else {
        newMoodHistory.push({ date: today, mood: moodValue });
      }

      // Keep only last 30 days of mood history
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      const filteredHistory = newMoodHistory.filter(
        entry => new Date(entry.date) >= cutoffDate
      );

      return {
        ...prev,
        checkIns: alreadyCheckedToday ? prev.checkIns : prev.checkIns + 1,
        lastCheckIn: today,
        moodHistory: filteredHistory
      };
    });
  };

  const getMilestones = () => {
    const milestones = [];
    
    if (progress.daysStrong >= 1) milestones.push('Day 1 Survivor');
    if (progress.daysStrong >= 7) milestones.push('7 Days Strong');
    if (progress.daysStrong >= 30) milestones.push('30 Days Healing');
    if (progress.daysStrong >= 100) milestones.push('100 Days Warrior');
    
    return milestones;
  };

  const getAverageMood = () => {
    if (progress.moodHistory.length === 0) return 0;
    
    const sum = progress.moodHistory.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round(sum / progress.moodHistory.length);
  };

  const resetProgress = () => {
    const resetData = {
      ...defaultProgress,
      startDate: new Date().toISOString(),
      daysStrong: 1
    };
    setProgress(resetData);
    localStorage.setItem('healingHubProgress', JSON.stringify(resetData));
  };

  return {
    progress,
    updateProgress,
    checkIn,
    getMilestones,
    getAverageMood,
    resetProgress
  };
};
