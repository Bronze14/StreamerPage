'use client'
import { useEffect, useState } from 'react'
import { useBoardStore } from '../store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { Button } from '@material-tailwind/react'

import Link from 'next/link'
export default function page() {
  const openModal = useModalStore((state) => state.openModal)
  const [board, getBoard, addPlus, addMinus] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.addPlus,
    state.addMinus,
  ])
  useEffect(() => {
    getBoard()
  }, [getBoard])
  const handleAddTodo = () => {
    openModal()
  }
  if (!board || !Array.isArray(board.columns)) {
    return <p>No data available.</p>
  }
  return (
    <main>
      <div>
        <a onClick={handleAddTodo}>
          <Button
            variant="outlined"
            className="flex items-center gap-4 p-6 m-5"
          >
            Add new Streamer
          </Button>
        </a>
        {board.columns.map((column) => (
          <div key={column.id} className="flex flex-col space-y-4">
            {column.streamers.map((streamer) => (
              <div key={streamer.$id} className="bg-blue-500 p-4">
                <h3 className="text-lg font-bold">
                  <Link key={streamer.$id} href={`/${streamer.title}`}>
                    {streamer.title}
                  </Link>
                </h3>
                <p>Points: {streamer.point}</p>
                <p>Description: {streamer.description}</p>
                <p>Platform: {streamer.platform}</p>

                <button onClick={() => addPlus(streamer.$id)}>Plus</button>
                <button onClick={() => addMinus(streamer.$id)}>Minus</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
