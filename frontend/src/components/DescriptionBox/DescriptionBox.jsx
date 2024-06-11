import React from 'react'

const DescriptionBox = () => {
  return (
    <div className='px-5 md:px-40 my-5'>
        <div className='flex'>
            <div className='flex items-center justify-center font-[600] border border-[#d0d0d0] p-2 cursor-pointer'>Description</div>
            <div className='flex items-center justify-center font-[600] border border-[#d0d0d0] p-2 cursor-pointe bg-[#fbfbfb] text-[#555]'>Reviews (122)</div>
        </div>
        <div className='flex flex-col gap-6 border border-[#d0d0d0] p-12'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptatum iure delectus facilis aperiam voluptate reprehenderit quod iusto quia veniam vel adipisci cumque esse, similique sed dolorum ipsam animi ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet quos a consequuntur quibusdam pariatur, nisi minus, nulla sint, modi architecto quas repellat provident quis nostrum necessitatibus perferendis veniam? Non.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptatum iure delectus facilis aperiam voluptate reprehenderit quod iusto quia veniam vel adipisci cumque esse, similique sed dolorum ipsam animi ipsum.</p>

        </div>
    </div>
  )
}

export default DescriptionBox