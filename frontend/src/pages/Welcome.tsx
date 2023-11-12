import {Button, Card, CardFooter, CardHeader, Image} from '@nextui-org/react'
import React from 'react'
import Student from '../static-images/student-signup.jpg';
import Teacher from '../assets/teacher.png';
import Recruiter from '../assets/recruiter.jpeg';
import BackgroundImage from '../assets/welcomeBackground.svg';
import {PiStudentFill} from "react-icons/pi";
import {LiaChalkboardTeacherSolid} from "react-icons/lia";
import {MdWork} from "react-icons/md";
import {useNavigate} from "react-router-dom";

export default function Welcome() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-screen relative bg-purple-950 overflow-y-auto">
            <img src={BackgroundImage} alt="Background Image"
                 className="w-full h-full absolute top-0 left-0 object-cover opacity-50"/>
            <div
                className="w-full h-full p-20 flex flex-col lg:flex-row justify-items-center justify-center gap-4">
                <Card isFooterBlurred className="h-[300px] col-span-12 sm:col-span-7 flex-1">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">STUDENT</p>
                        <h4 className="text-white/90 font-medium text-xl">Start learning</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src={Student}
                        style={{
                            filter: 'brightness(0.5)'
                        }}
                    />
                    <CardFooter
                        className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <PiStudentFill
                                className="w-10 h-11"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60"> Take courses and quiz yourself</p>
                            </div>
                        </div>
                        <Button color="primary" radius="full" size="sm" onClick={() => navigate('/signup/student')}>Become
                            a Student</Button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="h-[300px] col-span-12 sm:col-span-7 flex-1">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">TEACHER</p>
                        <h4 className="text-white/90 font-medium text-xl">Start teaching</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src={Teacher}
                        style={{
                            filter: 'brightness(0.5)'
                        }}
                    />
                    <CardFooter
                        className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <LiaChalkboardTeacherSolid
                                className="w-10 h-11"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Post courses and quiz students</p>
                            </div>
                        </div>
                        <Button color="primary" radius="full" size="sm" onClick={() => navigate('/signup/teacher')}>Become
                            a Teacher</Button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="h-[300px] col-span-12 sm:col-span-7 flex-1">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">RECRUITER</p>
                        <h4 className="text-white/90 font-medium text-xl">Start recruiting</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src={Recruiter}
                        style={{
                            filter: 'brightness(0.5)'
                        }}
                    />
                    <CardFooter
                        className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <MdWork
                                className="w-10 h-11"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Find the best candidates</p>
                            </div>
                        </div>
                        <Button color="primary" radius="full" size="sm" onClick={() => navigate('/signup/recruiter')}>Become
                            a Recruiter</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
