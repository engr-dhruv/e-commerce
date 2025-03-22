import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex gap-2 w-full justify-center p-3 text-2xl'>
      <p>{text1}</p>
      <p>{text2}</p>
    </div>
  )
}

export default Title
