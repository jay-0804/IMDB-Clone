import React from 'react';
import MediaCard from './MediaCard';

function MediaGrid({ items, type = 'movie', loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-zinc-800 animate-pulse"
          >
            <div className="aspect-[2/3] bg-zinc-700" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-700 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <p className="text-xl">No results found</p>
        <p className="text-sm mt-1">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type={type} />
      ))}
    </div>
  );
}

export default MediaGrid;
