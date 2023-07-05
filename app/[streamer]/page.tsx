'use client'

import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'

export default function Page({ params }: { params: { streamer: string } }) {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ])
  useEffect(() => {
    getBoard()
  }, [getBoard])
  if (!board || !Array.isArray(board.columns)) {
    return <p>No data available.</p>
  }
  const selectedStreamer = board.columns.reduce((foundStreamer, column) => {
    const streamer = column.streamers.find((s) => s.title === params.streamer)
    return streamer ? streamer : foundStreamer
  }, null)
  return (
    <div>
      {selectedStreamer ? (
        <div className="bg-blue-100 p-4">
          <h3 className="text-lg font-bold">{selectedStreamer.title}</h3>
          <p>Point: {selectedStreamer.point}</p>
          <p>Description: {selectedStreamer.description}</p>
          <p>Platform: {selectedStreamer.platform}</p>
        </div>
      ) : (
        <p>No streamer found with the name {params.streamer}</p>
      )}
    </div>
  )
}
