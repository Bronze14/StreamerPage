'use client'
import Image from 'next/image'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
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
  const selectedStreamer = board.columns.reduce<Streamer | null>(
    (foundStreamer, column) => {
      const streamer = column.streamers.find((s) => s.title === params.streamer)
      return streamer ? streamer : foundStreamer
    },
    null,
  )

  return (
    <div className="h-full mt-10 bg-gray-800">
      <Link href={`/`} className="flex items-center ml-40">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="ml-1">Back</span>
      </Link>
      {selectedStreamer ? (
        <div className="p-4 flex mx-20 my-21 ">
          <Image
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
            alt="Asmongold Profile Image"
            width={250}
            height={250}
            className="rounded-full"
          />
          <div className="ml-20 mt-8">
            <h3 className="text-5xl font-bold mb-4">
              {selectedStreamer.title}
            </h3>
            <p className="text-lg mb-2">Points: {selectedStreamer.point}</p>
            <p className="text-lg mb-2">
              Description: {selectedStreamer.description}
            </p>
            <p className="text-lg mb-2">
              Platform: {selectedStreamer.platform}
            </p>
          </div>
        </div>
      ) : (
        <p>No streamer found with the name {params.streamer}</p>
      )}
    </div>
  )
}
