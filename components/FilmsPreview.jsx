import * as React from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { flattenFilms, getRandomInt } from 'utils'
import Carousel from 'react-bootstrap/Carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { Autoplay, EffectFade } from 'swiper'
export default function FilmsPreview({ films }) {
  const router = useRouter()
  const flatFilms = React.useMemo(() => {
    return flattenFilms(films)
  }, [films])
  // const maxImageHeight = React.useMemo(() => {
  //   return Math.min(...flatFilms.map((film) => film.height))
  // }, [flatFilms])
  // console.log(maxImageHeight)
  return (
    <Box
      className="d-flex justify-content-center definition no-padd"
      // sx={{ height: maxImageHeight }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 100,
          disableOnInteraction: true
        }}
        modules={[EffectFade, Autoplay]}
        loop={true}
        effect="fade"
      >
        {flatFilms.map((film, index) => {
          return (
            <SwiperSlide key={film.imageId}>
              <img
                key={film.imageId}
                src={film.src}
                height={film.height}
                width={film.width}
                alt={'Picture of last film'}
                loading="lazy"
                className="preview-imgs"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
