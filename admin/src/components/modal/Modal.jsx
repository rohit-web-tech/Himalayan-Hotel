import React from 'react'
import Loader from "../loader.jsx";

const Modal = ({ loading, onCancel, onConfirm, show, confirmText, cancelText, type = "confirm", title="Are you sure ?", desc }) => {
  return (
    <div className={`w-full h-screen fixed top-0 left-0 ${show ? "flex" : "hidden"} justify-center items-center flex-col z-50 modal-bg`}>
      <div className='bg-white max-w-[400px] rounded-lg overflow-hidden'>
        <div
          className='flex p-4'
        >
          <div className="logo">
          </div>
          <div className="flex flex-col gap-2">
            <h2 className='text-slate-800 font-semibold text-lg'>{title}</h2>
            <p className='text-slate-500 text-sm'>{desc}</p>
          </div>
        </div>
        <div
          className='bg-[#f8f8f8] flex justify-end gap-4 px-4 py-3'
        >
          {
            type === "confirm" && <button
              className='border-slate-500 border-2 py-1 px-3 rounded-md text-sm bg-white hover:bg-slate-300 text-slate-800'
              onClick={onCancel}
            >{cancelText}</button>
          }
          <button
            className="py-1 px-3 rounded-md text-sm bg-[--primary-color] min-w-[100px] text-white hover:opacity-80"
            onClick={onConfirm}
          >
            {
              loading ? <Loader styles='w-4 h-4' /> : confirmText
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;