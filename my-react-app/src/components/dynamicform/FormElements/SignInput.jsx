import React from 'react'

function SignInput({className, signs, setSigns, ...rest}) {
  return (
    <div className={`w-full flex justify-between items-center border rounded-[6px] ${className}`}>
        <div className='px-3 text-[#8C8C8C]'>Signed by</div>
        <button className='bg-[#5BC4BF] text-white px-3 py-2'>Sign Now As/Unsign</button>
    </div>
  )
}

export default SignInput