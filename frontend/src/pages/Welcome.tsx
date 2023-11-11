import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React from 'react'
import Student from '../static-images/student-signup.jpg';

export default function Welcome() {

    function linksTo(link: string) {
        console.log(link);
        window.location.href = link;
    }

  return (
    <div className="min-h-screen w-screen relative bg-purple-950 overflow-y-scroll">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] flex flex-row flex-wrap justify-items-center justify-center gap-4">
        <Card isPressable onPress={() => linksTo("/signup/student")} className="group col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start bg-slate-900/75 mt-[-5px]">
                <h2 className="text-xl text-white uppercase font-bold">Student</h2>
                <p className="text-gray-400 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-[70%] blur-[2px] group-hover:brightness-90 group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        <Card isPressable onPress={() => linksTo("/signup/teacher")} className="group col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start bg-slate-900/75 mt-[-5px]">
                <h2 className="text-xl text-white uppercase font-bold">Teacher</h2>
                <p className="text-gray-400 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-[70%] blur-[2px] group-hover:brightness-90 group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        <Card isPressable onPress={() => linksTo("/signup/recruter")} className="group col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start bg-slate-900/75 mt-[-5px]">
                <h2 className="text-xl text-white uppercase font-bold">Recruter</h2>
                <p className="text-gray-400 font-medium text-large">Devin-o un student si invata orice skill doresti, intuitiv si fara probleme</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-[70%] blur-[2px] group-hover:brightness-90 group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Student}
            />
        </Card>
        </div>
    </div>
  )
}
