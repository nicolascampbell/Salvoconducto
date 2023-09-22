import * as React from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { flattenFilms } from 'utils'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/core'
import { Autoplay } from 'swiper'
import CustomImage from '@/components/CustomImage'
import Carousel from 'react-bootstrap/Carousel'
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
      <Carousel 
      indicators={false}
      controls={false}
      interval={10}
      fade>
        {flatFilms.map((film, index) => {
          return (
            <Carousel.Item key={film.imageId}>
              <CustomImage
                key={film.imageId}
                src={film.src}
                alt={'Preview of film' + film.key}
                height={'100%'}
                // customStyle={{ transform: 'scale(1.02)' }}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
      {/* <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
          
        }}
        modules={[ Autoplay]}
        loop={true}
        // effect="fade"
      >
        {flatFilms.map((film, index) => {
          return (
            <SwiperSlide key={film.imageId}>
              <CustomImage
                key={film.imageId}
                src={film.src}
               
                alt={'Preview of film' + film.key}
                customStyle={{ transform: 'scale(1.02)' }}
              />
            </SwiperSlide>
          )
        })}
      </Swiper> */}
    </Box>
  )
}
