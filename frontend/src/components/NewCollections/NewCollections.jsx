import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';

const NewCollections = () => {
  const [new_collection, setNew_Collection] = useState([]);
  const ConnString = import.meta.env.VITE_ConnString;
  useEffect(() => {
    const fetch_all_products = async () => {
      await fetch(`${ConnString}/user/newcollections`, {
        method: "GET"
      }).then((response) => response.json()).then((data) => setNew_Collection(data.new_collections))
    }
    fetch_all_products();
  }, [])
  return (
    <div className='flex flex-col items-center gap-2.5 px-5 md:px-44'>
      <h1 className='text-[#171717] text-[50px] font-[600]'>NEW COLLECTIONS</h1>
      <hr className='w-[200px] h-[6px] rounded-full bg-[#252525]' />
      <div className='mt-[50px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
        {new_collection?.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections