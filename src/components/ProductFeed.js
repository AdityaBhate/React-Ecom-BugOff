// import React from 'react'
// import Product from './Product'

// function ProductFeed({ products }) {
//   return (
//     <div className="bg-[#000] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:-mt-52 mx-auto">

//       {products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
//         <Product
//           key={id}
//           id={id}
//           title={title}
//           price={price}
//           description={description}
//           category={category}
//           image={image}
//         />
//       ))}


//       <div className="md:col-span-2">
//         {products.slice(4, 5).map(({ id, title, price, description, category, image }) => (
//           <Product
//             key={id}
//             id={id}
//             title={title}
//             price={price}
//             description={description}
//             category={category}
//             image={image}
//           />
//         ))}
//       </div>

//       {products.slice(5, products.length).map(({ id, title, price, description, category, image }) => (
//         <Product
//           key={id}
//           id={id}
//           title={title}
//           price={price}
//           description={description}
//           category={category}
//           image={image}
//         />
//       ))}
//     </div>
//   )
// }

// export default ProductFeed

import React from 'react';
import Product from './Product';

function ProductFeed({ products }) {
  return (
    <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mx-auto">
      {products.map(({ id, title, price, description, category, image }) => (
        <div className="flex items-stretch" key={id}>
          <Product
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        </div>
      ))}
    </div>
  );
}



export default ProductFeed;

