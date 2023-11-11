

import { Avatar, Progress } from '@nextui-org/react'
import react from "react"


export default function ProfileStudent() {
    const defValues = {
        firstName: 'Ioan Stefan',
        lastName: 'Raducu',
        email: 'istefanraducu@gmail.com',
        completed: 210,
        percentage: 78.3,
        skills: [
            {
                id: 1,
                chapter: "Programarea calculatoarelor",
                completed: 70,
                percentage: 81.2
            },
            {
                id: 2,
                chapter: "Proiectare Logica",
                completed: 30,
                percentage: 51.2
            },
            {
                id: 3,
                chapter: "Utilizarea Sistemelor de Operare",
                completed: 95,
                percentage: 95.2
            },
            {
                id: 4,
                chapter: "Programarea calculatoarelor",
                completed: 70,
                percentage: 81.9
            },
            {
                id: 5,
                chapter: "Analiza Matematica",
                completed: 13,
                percentage: 23.5
            },

        ]
    }

    function getColor(percentage: number) {
        if(percentage>=75) return "success";
        if(percentage>=45) return "warning";
        return "danger"; 
    }

    function returnChapter(skill: any) {
        return (
            <div className="m-5 border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto" key={skill.chapter}>
                <h3 className="text-center p-4 text-3xl">{skill.chapter}</h3>
                <div className="border-slate-600 flex border-large rounded">
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Total completed questions: {skill.completed}</div>
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Average percentage: {skill.percentage}%</div>
                </div>
                <Progress size="md" color={getColor(skill.percentage)} aria-label="Loading..." value={skill.percentage} />
            </div>
        )
    }

  return (
    <div className="bg-slate-950 pt-5 w-screen overflow-hidden">
    <div className="flex">
        <div className="flex-none aspect-square">
            <Avatar isBordered radius="md" className="aspect-square w-full h-full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        </div>
        <div className="inline-block bg-slate-800 flex-auto ms-[3px]">
            <h2 className="text-center text-3xl mt-9 text-slate-200">{defValues.firstName + ', ' + defValues.lastName}</h2>
            <h3 className="text-center text-lg text-slate-400">{defValues.email}</h3>
            <div className="border-slate-600 flex border-large mt-8 rounded">
                <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-4 bg-slate-700">Total completed questions: {defValues.completed}</div>
                <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-4 bg-slate-700">Average percentage: {defValues.percentage}%</div>
            </div>
        </div>
        <hr/>
    </div>
    <div className='pb-20'>
            {
                defValues.skills.map(item => returnChapter(item))
            }
    </div>
    </div>

  )
}
