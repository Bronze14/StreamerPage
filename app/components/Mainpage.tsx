'use client'
import { useEffect } from 'react'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { Button } from '@material-tailwind/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { LoadingPage } from './loading'
import { Tooltip } from '@material-tailwind/react'

export default function Mainpage() {
  const openModal = useModalStore((state) => state.openModal)
  const MAX_TEXT_LENGTH = 20

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

  return (
    <div>
      <a>
        <Button
          variant="outlined"
          className="flex items-center gap-4 p-6 ml-auto mt-10 mr-20 text-white"
          onClick={handleAddTodo}
        >
          Add new Streamer&apos;
        </Button>
      </a>
      {board.columns.length < 1 ? (
        <LoadingPage />
      ) : (
        <div className="my-10 mx-20 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Streamer name
                </th>
                <th scope="col" className="px-6 py-3">
                  Points
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Platform
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Upvote Downvote</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {board.columns.map((column) =>
                column.streamers.map((streamer: Streamer) => (
                  <tr
                    key={streamer.$id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        href={`/${streamer.title}`}
                        className="hover:underline"
                      >
                        {streamer.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{streamer.point}</td>
                    <td className="px-6 py-4">
                      <Tooltip
                        content={streamer.description}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        {streamer.description.length > MAX_TEXT_LENGTH
                          ? `${streamer.description.substring(
                              0,
                              MAX_TEXT_LENGTH,
                            )}...`
                          : streamer.description}
                      </Tooltip>
                    </td>
                    <td className="px-6 py-4">{streamer.platform}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => addPlus(streamer.$id)}>
                        <ChevronUpIcon className="h-6 w-6 text-white-600 dark:text-white-500 hover:text-blue-900 hover:underline" />
                      </button>
                      <button onClick={() => addMinus(streamer.$id)}>
                        <ChevronDownIcon className="h-6 w-6 text-white-600 dark:text-white-500 hover:text-blue-900 hover:underline" />
                      </button>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
