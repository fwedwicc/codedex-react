import React, { useContext } from 'react'
import { UserContext } from './UserContext'

const Results = ({ element, artwork }) => {
  const { name } = useContext(UserContext)

  return (
    <div className='mt-7 w-full max-w-2xl border border-zinc-200/50 shadow-2xl shadow-zinc-200/60 rounded-2xl p-4 pt-3.5'>
      <p>Results</p>
      <h2 className='text-3xl font-bold'>
        <strong>{name}</strong>, your element is: <span className='text-indigo-600'>{element}</span>
      </h2>
      {artwork ? (
        <div className="mt-4 bg-zinc-50 px-6 py-5 rounded-2xl space-y-3">
          <span className='block text-xl font-semibold'>{artwork.title}</span>
          <img className='rounded-xl' src={artwork.primaryImage} alt={artwork.title} />
          <div>
            <p>{artwork.artistDisplayName}</p>
            <p>{artwork.objectDate}</p>
          </div>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  )
}

export default Results