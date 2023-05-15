import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


function Banner() {
  return (
    <div className='relative'>
      <div className='w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0' />
      <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={4000}>
        <div>
          <img loading='lazy' src="/banner1.jpg" alt='' width={50} />
        </div>
        <div>
          <img loading='lazy' src="/banner2.jpg" alt='' width={50} />
        </div>
        <div>
          <img loading='lazy' src="/banner3.jpg" alt='' width={50} />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner