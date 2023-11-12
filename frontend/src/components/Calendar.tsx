import React from 'react'

type Props = {
    data: any
}

export default function Calendar({data}: Props) {

    function displaySquare(item: number) {
        return (
            <div className={getClassName(item) + " basis-[9%] !aspect-square rounded-md mt-[8px]"}></div>
        )
    }

    function getClassName(val: number) {
        if(!val) return 'bg-gray-900';
        if(val>9) val = 9;
        return 'bg-green-' + (val*100);
    }

  return (
    <>
    <div className='d-none bg-slate-500 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900 bg-slate-400'></div>
    <div className='flex flex-wrap gap-[1%] bg-slate-700 justify-center'>
        {
            data.map((item: number) => displaySquare(item))
        }
    </div>
    </>
  )
}
