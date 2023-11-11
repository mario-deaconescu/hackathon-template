import { Button, Image } from '@nextui-org/react'
import HeroBg from '../../static-images/hero-bg.jpg'
import React from 'react'

export default function Hero() {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
        <img src={HeroBg} alt="hero background" className='object-cover w-full h-full blur-sm brightness-50'/>
        <div className="w-[50%] h-[40%] absolute top-1/2 left-0 transform -translate-y-1/2 rounded-3xl rounded-s-none bg-slate-800 shadow-2xl border min-w-[600px] max-w-full">
            <div className='text-slate-100 text-3xl p-10 bold text-center'>
                4tzaPoliUnibuc
            </div>
            <hr/>
            <div className="text-center text-slate-200 text-xl p-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea impedit accusantium voluptatum corrupti nisi soluta vitae non reiciendis dolores incidunt laboriosam, modi eligendi quam necessitatibus blanditiis eos explicabo assumenda cum atque voluptates illo dolore rem? Sunt rem molestiae, voluptate placeat minus in aut beatae expedita tempore similique repudiandae officiis mollitia?
            </div>
            
        </div>
        <Button color="success" variant="shadow" size="lg" className='absolute left-[80%] top-[80%] text-slate-50 text-2xl p-10' >Start Learning</Button>
        <Button color="secondary" variant="shadow" size="lg" className='absolute right-[80%] top-[80%] text-slate-50 text-2xl p-10' >Login</Button>
    </div>
  )
}
