import { API_URL } from 'utils/config'
export function flattenFilms(films) {
  return films.map((film) => {
    const coverImage = film.cover.data
    return {
      ...film,
      src: `${API_URL}${coverImage.attributes.url}`,
      height: coverImage.attributes.height,
      width: coverImage.attributes.width,
      imageId: coverImage.id
    }
  })
}
export function getRandomInt(min = 0, max) {
  return Math.floor(Math.random() * max)
}
