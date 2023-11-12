import { Button, Image, Link } from '@nextui-org/react'
import HeroBg from '../../static-images/hero-bg.jpg'
import React from 'react'
import Layers from '../../static-images/layered-waves.svg'

export default function Hero() {
  return (
    <div className="w-screen h-screen position relative">
        <img src={Layers} alt="Layers" className="w-full absolute bottom-0 left-0 select-none z-10" />
        <div className='flex flex-column h-full items-center justify-start'>
            <div className="basis-1/2 text-white ps-8 z-20">
                <h1 className='text-[2.5rem] font-thin'>We connect students, teachers and recruters</h1>
                <h2 className="text-[2.7rem] font-bold font-mono">For a better <span className='bg-gradient-to-tr from-red-800 via-red-500 to-blue-300 bg-clip-text text-transparent'>future</span></h2>
                <div className="flex justify-center">
                <Button
                    href="/login"
                    as={Link}
                    color="secondary"
                    variant="solid"
                    className='p-6 m-4 text-lg'
                    >
                    Login
                </Button>
                <Button
                    href="/welcome"
                    as={Link}
                    color="primary"
                    variant="shadow"
                    className='p-6 m-4 text-lg'
                    >
                    Stert Learning
                </Button>
                </div>
                
            </div>
            <div className="basis-1/2 item-center h-full bg-red-500 relative">
                <img src={HeroBg} alt="Hero Background" className="object-cover bottom-0 left-0 select-none h-full" />
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/25"></div>
            </div>
        </div>
    </div>
  )
}
