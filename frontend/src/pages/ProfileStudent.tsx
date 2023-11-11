

import { Accordion, AccordionItem, Avatar, Progress, accordionItem } from '@nextui-org/react'
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
                percentage: 81.2,
                chapters: [
                    {
                        name: "PCLP1",
                        completed: 210,
                        percentage: 78.3,
                    }
                ]
            },
            {
                id: 2,
                chapter: "Proiectare Logica",
                completed: 30,
                percentage: 51.2,
                chapters: [
                    {
                        name: "PCLP1",
                        completed: 210,
                        percentage: 78.3,
                    }
                ]
            },
            {
                id: 3,
                chapter: "Utilizarea Sistemelor de Operare",
                completed: 95,
                percentage: 95.2,
                chapters: [
                    {
                        name: "PCLP1",
                        completed: 210,
                        percentage: 78.3,
                    }
                ]
            },
            {
                id: 4,
                chapter: "Programarea calculatoarelor",
                completed: 70,
                percentage: 81.9,
                chapters: [
                    {
                        name: "PCLP1",
                        completed: 210,
                        percentage: 78.3,
                    }
                ]
            },
            {
                id: 5,
                chapter: "Analiza Matematica",
                completed: 13,
                percentage: 23.5,
                chapters: [
                    {
                        name: "PCLP1",
                        completed: 210,
                        percentage: 78.3,
                    }
                ]
            },

        ]
    }

    function getColor(percentage: number) {
        if(percentage>=75) return "success";
        if(percentage>=45) return "warning";
        return "danger"; 
    }

    function returnChapter(chapter: any) {
        return (
            <div className="m-5 border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto" key={chapter.id}>
                <h3 className="text-center p-4 text-3xl">{chapter.name}</h3>
                <div className="border-slate-600 flex border-large rounded">
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Total completed questions: {chapter.completed}</div>
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Average percentage: {chapter.percentage}%</div>
                </div>
                <Progress size="md" color={getColor(chapter.percentage)} aria-label="Loading..." value={chapter.percentage} />
            </div>
        );
    }

    function returnSkill(skill: any) {
        /*const data = {
            percentage:0.7,
            skills: [
                {
                    name: "Informatica",
                    chapters: [
                        {
                            id: 101
                            name: "Poo",
                            percetange: 0.7
                        }
                    ]
                }
            ]
        }*/
        return (
            <div className="m-5 border-medium rounded-lg bg-slate-700 lg: w-[80%] mx-auto" key={skill.chapter}>
                <h3 className="text-center p-4 text-3xl">{skill.chapter}</h3>
                <div className="border-slate-600 flex border-large rounded">
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Total completed questions: {skill.completed}</div>
                    <div className="basis-1/2 text-center border border-slate-600 border-e-medium p-2 bg-slate-800">Average percentage: {skill.percentage}%</div>
                </div>
                <Progress size="md" color={getColor(skill.percentage)} aria-label="Loading..." value={skill.percentage} />
                <Accordion>
                        <AccordionItem key={skill.id} aria-label="Accordion 1" title="Chapters">
                            {
                                skill.chapters.map((item: any) => returnChapter(item))
                            }
                        </AccordionItem>
                </Accordion>
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
                defValues.skills.map(item => returnSkill(item))
            }
    </div>
    </div>

  )


}
