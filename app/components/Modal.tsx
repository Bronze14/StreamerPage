'use client'

import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TypeOfPlatform from './TypeOfPlatform'

function Modal() {
  const [
    addTask,
    description,
    setDescription,
    newTaskInput,
    setNewTaskInput,
    newTaskType,
  ] = useBoardStore((state) => [
    state.addTask,
    state.description,
    state.setDescription,
    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskType,
  ])
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ])
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newTaskInput) return
    addTask(newTaskInput, newTaskType, description)
    closeModal()
  }

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={(e) => handleSubmit(e)}
        className="relative z-10"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>
        <div className="flex min-h-full items-center justify-center p-4 text-center"></div>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Streamer
                </Dialog.Title>
                <div>
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a streamer's name here"
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <TypeOfPlatform />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-black-900 pb-2"
                >
                  Add a Description
                </Dialog.Title>
                <div>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a streamer's name here"
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-auto-not-allowed"
                  >
                    Add Streamer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
