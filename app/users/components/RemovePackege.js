import { Trash } from 'lucide-react'
import React from 'react'

export default function RemovePackege() {
  return (
    <button
        // onClick={handleRemove}
        className="mt-2 px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 w-fit m-auto"
      >
        <Trash className="h-4 w-4" /> Remove
      </button>
  )
}
