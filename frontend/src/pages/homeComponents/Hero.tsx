import {Button, Link} from '@nextui-org/react'
import HeroBg from '../../static-images/hero-bg.jpg'
import Layers from '../../static-images/layered-waves.svg'
import Logo from '../../assets/logo.png';

export default function Hero() {
    return (
        <div className="w-screen h-screen position relative">
            <img src={Layers} alt="Layers" className="w-full absolute bottom-0 left-0 select-none z-10"/>
            <div className='flex flex-column h-full items-center justify-start'>
                <div className="basis-1/2 text-white ps-8 z-20 pl-20">
                    <h1 className='text-[3rem] font-bold mb-3 ml-3' style={{
                        lineHeight: '3.5rem',
                    }}>We connect students, teachers and recruiters</h1>
                    <h2 className="text-[2.5rem] font-thin ml-3">For a better <span
                        className='font-bold bg-gradient-to-tr from-red-800 via-red-500 to-blue-300 bg-clip-text text-transparent'>future</span>
                    </h2>
                    <div className="flex justify-start">
                        <Button
                            href="/welcome"
                            as={Link}
                            color="primary"
                            variant="shadow"
                            className='p-6 m-4 text-lg'
                        >
                            Start Learning
                        </Button>
                        <Button
                            href="/login"
                            as={Link}
                            color="default"
                            variant="solid"
                            className='p-6 m-4 text-lg'
                        >
                            Login
                        </Button>
                    </div>

                </div>
                <div className="basis-1/2 item-center h-full bg-red-500 relative">
                    <img src={HeroBg} alt="Hero Background"
                         className="object-cover absolute bottom-0 left-0 select-none h-full opacity-50"/>
                    <div
                        className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/25"></div>
                    <div className="w-full h-full flex items-center justify-center">
                        <img src={Logo} alt="Logo" className="w-1/2" style={{
                            zIndex: 100,
                            width: '200px',
                            maxWidth: '50%',
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
