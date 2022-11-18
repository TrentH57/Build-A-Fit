import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./componentstyles/coverflow.css";

// import required modules
import { EffectCoverflow, Pagination} from "swiper";

const CoverFlow = (props) => { 
  let arr = ["https://i.etsystatic.com/13787576/r/il/92f95d/3261081855/il_fullxfull.3261081855_i5ht.jpg","https://i.etsystatic.com/13787576/r/il/92f95d/3261081855/il_fullxfull.3261081855_i5ht.jpg","https://i.etsystatic.com/13787576/r/il/92f95d/3261081855/il_fullxfull.3261081855_i5ht.jpg"]
  const { articlesToDisplay } = props
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {articlesToDisplay.map((article) =>
          <SwiperSlide key ={article._id}>
            <img src={article.imgURL} />
          </SwiperSlide>
        )}
        
      </Swiper>
    </>
  );
}

export default CoverFlow;