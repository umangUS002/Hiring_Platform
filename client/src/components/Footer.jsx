import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <footer className="bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          {/* <img src={assets.logo} className="w-32" alt="Logo" /> */}
          <span className="text-sm text-gray-500 hidden md:block">
            © {new Date().getFullYear()} PickYourHire. All rights reserved.
          </span>
        </div>

        <div className="flex gap-4">
          <img width={30} className="hover:scale-110 transition cursor-pointer" src={assets.facebook_icon} />
          <img width={30} className="hover:scale-110 transition cursor-pointer" src={assets.instagram_icon} />
          <img width={30} className="hover:scale-110 transition cursor-pointer" src={assets.twitter_icon} />
        </div>

      </div>
    </footer>
  )
}


export default Footer
