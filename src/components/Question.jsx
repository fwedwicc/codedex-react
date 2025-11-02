import React from 'react'

const Question = ({ question, options, onAnswer }) => {
  return (
    <div className='mt-7 p-4 border border-zinc-200/50 shadow-2xl shadow-zinc-200/60 rounded-2xl'>
      <p className='text-xl font-semibold'>{question}</p>
      <div className='grid grid-cols-2 gap-1.5 mt-4'>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className='bg-indigo-50/70 hover:bg-indigo-600 hover:text-white text-indigo-600 px-3 py-2 rounded-lg'>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question