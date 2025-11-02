import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'

const UserForm = () => {
  const [inputName, setInputName] = useState('')
  const { setName } = useContext(UserContext)


  function handleSubmit(e) {
    e.preventDefault()
    setName(inputName)
    window.history.pushState({}, '', '/quiz')
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  return (
    <form onSubmit={handleSubmit} className='space-x-3 mt-7'>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        className='border border-gray-300 rounded-lg focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none py-2 px-3'
      />
      <button type="submit" className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>Submit</button>
    </form>
  )
}

export default UserForm