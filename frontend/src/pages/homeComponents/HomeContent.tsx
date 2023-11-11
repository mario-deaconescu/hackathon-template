import { Card, CardHeader, Image } from '@nextui-org/react'
import Student from '../../static-images/student-signup.jpg';
import React from 'react'

export default function HomeContent() {
  return (
    <div className="flex flex-row flex-wrap justify-items-center justify-center gap-4 mt-16">
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-gray-800 uppercase font-bold">Student</h2>
                <p className="text-gray-400 group-hover:text-gray-800 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-gray-800 uppercase font-bold">Student</h2>
                <p className="text-gray-400 group-hover:text-gray-800 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-gray-800 uppercase font-bold">Student</h2>
                <p className="text-gray-400 group-hover:text-gray-800 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%] mb-40">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-gray-800 uppercase font-bold">Student</h2>
                <p className="text-gray-400 group-hover:text-gray-800 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        </div>
  )
}
