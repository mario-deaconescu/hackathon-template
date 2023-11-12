import { Card, CardHeader, Image } from '@nextui-org/react'
import Student from '../../static-images/student-signup.jpg';
import Content1 from '../../static-images/content1.jpg'
import Content2 from '../../static-images/homecontent-2.avif'
import Content3 from '../../static-images/content3.jpg'
import Content4 from '../../static-images/Content4.jpg'
import Content5 from '../../static-images/content5.jpg'
import Content6 from '../../static-images/content6.jpg'
import React from 'react'

export default function HomeContent() {
  return (
    <div className="flex flex-row flex-wrap justify-items-center justify-center gap-4 mt-16">
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">AI-Driven Matching</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Ever wish for a crystal ball to find your perfect match? Our AI algorithms do just that for students and teachers. Personalized matching based on learning styles and career goals ensures everyone finds their ideal counterpart in the educational journey</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content1}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">User-Friendly Platform</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Imagine a platform so intuitive that connecting with the right teacher or finding the perfect student is as easy as a few clicks. Our user-friendly design prioritizes a seamless experience, making education connections smoother than ever.</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content2}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">Comprehensive Skills Assessment</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Dive into the future of talent evaluation! Our cutting-edge system blends AI prowess with teacher insights to offer recruiters a 360-degree view of a student's skills. It's not just about grades; it's about understanding the full spectrum of capabilities.</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content3}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%]">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">Detailed Profiles</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Unleash the power of comprehensive storytelling! Encourage students to create profiles that go beyond the resume. Academic achievements, skills, and even extracurricular passions all woven into a narrative that speaks volumes to recruiters.e</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content4}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%] mb-40">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">Visual Representation of Skills</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Charts and graphs meet skills assessment! Picture a dynamic, visual showcase of a student's capabilities. Recruiters, say goodbye to data overload and hello to a snapshot that instantly communicates a candidate's strengths.</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content5}
            />
        </Card>
        <Card className="group col-span-12 sm:col-span-4 h-[300px] lg:basis-[40%] basis-[80%] mb-40">
            <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-slate-900/75 h-full group-hover:bg-slate-900/40 transition duration-300 p-20">
                <h2 className="text-white text-xl group-hover:text-black uppercase font-bold group-hover:bg-gray-50/20">Continuous Improvement</h2>
                <p className="text-gray-400 group-hover:text-black font-medium text-large group-hover:bg-gray-50/20">Welcome to the era of perpetual enhancement! Your feedback is our fuel. Regular updates driven by user input mean our platform is always evolving, staying ahead of the curve to meet the dynamic needs of students, teachers, and recruiters</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 !transition-all ease-in-out !duration-300"
                src={Content6}
            />
        </Card>
        </div>
  )
}
