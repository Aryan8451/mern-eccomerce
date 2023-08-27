import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='text-center'>All right reserved &copy; Aryan Goud</h4>
        <p className="text-center mt-3">
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>contact</Link>
            <Link to={"/policies"}>privacy policy</Link>
        </p>
    </div>
  )
}

export default Footer