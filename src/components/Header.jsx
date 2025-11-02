import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='text-center space-y-1.5'>
      <h1 className='text-4xl font-bold'>Which element are you?</h1>
      <p>Based on completely random things :)</p>
      <div className='flex gap-4 justify-center mt-8'>
        <Link to='/' className='text-indigo-600'>Home</Link>
        <Link to='/quiz' className='text-indigo-600'>Quiz</Link>
      </div>
    </header>
  )
}

export default Header