import React from 'react'

type Props = {
    data: any
}

export default function Calendar({data}: Props) {

    function displaySquare(item: number) {
        return (
            <div
                className={getClassName(item) + " basis-[9%] !aspect-square rounded-md flex items-center justify-center"}
                style={{
                    textShadow: '0 0 0.5rem black',
                }}>
                {item}
            </div>
        )
    }

    function getClassName(val: number) {
        if (!val) return 'bg-gray-900';
        if (val > 9) val = 9;
        return 'bg-green-' + (val * 100);
    }

    return (
        <>
            <div
                className='d-none bg-slate-500 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900 bg-slate-400'></div>
            <div className='flex flex-wrap gap-1 bg-slate-700 justify-center p-1 rounded-lg'>
                {
                    data.map((item: number) => displaySquare(item))
                }
            </div>
        </>
    )
}
