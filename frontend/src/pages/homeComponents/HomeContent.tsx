import {Card, CardFooter, CardHeader, Image} from '@nextui-org/react'
import Content1 from '../../static-images/content1.jpg'
import Content2 from '../../static-images/homecontent-2.avif'
import Content3 from '../../static-images/content3.jpg'
import Content5 from '../../static-images/content5.jpg'
import React from 'react'

export default function HomeContent() {
    return (
        <div className="flex flex-row flex-wrap justify-items-center justify-center gap-4 p-16">
            <Card isFooterBlurred className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">AI-DRIVEN</p>
                    <h4 className="text-white font-medium text-2xl">Find the best match</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
                    src={Content1}
                    style={{
                        filter: 'brightness(0.5)'
                    }}
                />
                <CardFooter
                    className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    Ever
                    wish for a crystal ball to find your perfect match? Our AI algorithms do just that for students
                    and recruiters. Personalized candidate recommendations mean recruiters can find the right person
                    for the job.
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">USER FRIENDLY</p>
                    <h4 className="text-white font-medium text-2xl">Get right into the action</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
                    src={Content2}
                    style={{
                        filter: 'brightness(0.5)'
                    }}
                />
                <CardFooter
                    className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    Imagine
                    a platform so intuitive that connecting with the right teacher or finding the perfect student is
                    as easy as a few clicks. Our user-friendly design prioritizes a seamless experience, making
                    education connections smoother than ever.
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">SKILL ASSESSMENT</p>
                    <h4 className="text-white font-medium text-2xl">Challenge yourself</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
                    src={Content3}
                    style={{
                        filter: 'brightness(0.5)'
                    }}
                />
                <CardFooter
                    className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    Dive
                    into the future of talent evaluation! Our cutting-edge system blends AI prowess with teacher
                    insights to offer recruiters a 360-degree view of a student's skills. It's not just about
                    grades; it's about understanding the full spectrum of capabilities.
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">DETAILED PROFILES</p>
                    <h4 className="text-white font-medium text-2xl">See how well others are doing</h4>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
                    src={Content5}
                    style={{
                        filter: 'brightness(0.5)'
                    }}
                />
                <CardFooter
                    className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    Unleash
                    the power of comprehensive storytelling! Encourage students to create profiles that go beyond
                    the resume. Academic achievements, skills, and even extracurricular passions all woven into a
                    narrative that speaks volumes to recruiters.
                </CardFooter>
            </Card>
        </div>
    )
}
