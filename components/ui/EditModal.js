
'use client'
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import Modal from "./NewModal";
import { AiFillEdit } from "react-icons/ai";

export default function UniversalEditButton({
  children,
  className = "flex items-center gap-2 justify-center",
  buttonText = "Edit",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        className={`${className} p-1 `}
        onClick={() => setIsOpen(true)}
      >
      <AiFillEdit className="h-4 w-4" />  {buttonText}
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* {children} */}
          {isOpen &&
            React.cloneElement(children, {
              isOpen,
              setIsOpen,
            })}
        </Modal>
      )}
    </div>
  );
}
