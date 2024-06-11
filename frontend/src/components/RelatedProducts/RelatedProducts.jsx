import React, { useEffect, useState } from 'react'
import Item from '../Item/Item';
import all_product from '../../assets/all_product';
const RelatedProducts = (props) => {
  const { product } = props;
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const getRelatedProducts = () => {
      const related = [];
      let i = 0, j = 0;
      while (i < 4) {
        if (all_product[(product.id + j + 1) % all_product.length].category === product.category) {
          related.push(all_product[(product.id + i + 1) % all_product.length]);
          i++;
        }
        j++;
      }
      setRelatedProducts(related);
    }
    getRelatedProducts();
  }, [product])

  return (
    <div className='flex flex-col items-center gap-2.5 px-5 md:px-44'>
      <h1 className='text-[#171717] text-[30px] font-[600]'>Related Products</h1>
      <hr className='w-[200px] h-[6px] rounded-full bg-[#252525]' />
      <div className='my-[30px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7'>
        {relatedProducts.length > 0 ? relatedProducts.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        }) : <></>}
      </div>
    </div>
  )
}

export default RelatedProducts