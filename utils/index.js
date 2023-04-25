import { API_URL } from 'utils/config'
export function flattenFilms(films) {
  return films.map((film) => {
    const coverImage = film.cover.data
    return {
      ...film,
      src: `/films/${film.key}/webpLow/${coverImage.attributes.name}`,
      height: coverImage.attributes.height,
      width: coverImage.attributes.width,
      imageId: coverImage.id
    }
  })
}
export function getRandomInt(min = 0, max) {
  return Math.floor(Math.random() * max)
}
export const getFilmName = (filmKey) => `Film ${filmKey}`
