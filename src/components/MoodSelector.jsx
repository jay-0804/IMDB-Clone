import React from 'react';

const MOODS = [
  { id: 'action', label: 'Action', emoji: '🎬' },
  { id: 'comedy', label: 'Comedy', emoji: '😂' },
  { id: 'drama', label: 'Drama', emoji: '🎭' },
  { id: 'horror', label: 'Horror', emoji: '👻' },
  { id: 'romance', label: 'Romance', emoji: '💕' },
];

function MoodSelector({ selectedMood, onMoodChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select your mood for recommendations">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          type="button"
          onClick={() => onMoodChange?.(mood.id)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            selectedMood === mood.id
              ? 'bg-yellow-500 text-black'
              : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white'
          }`}
        >
          <span className="mr-1">{mood.emoji}</span>
          {mood.label}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;
