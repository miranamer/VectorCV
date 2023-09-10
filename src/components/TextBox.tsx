import React from 'react'

type props = {
    text: string
}

const TextBox = ({text}: props) => {
  return (
    <div className="w-[600px] rounded-sm border-2 border-blue-700 min-h-[400px] p-5 bg-blue-600 text-lg text-white font-semibold flex flex-wrap justify-center break-all">
        <h1>{text}</h1>
    </div>
  )
}

export default TextBox