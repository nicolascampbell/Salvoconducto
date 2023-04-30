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
export async function getAllFilms() {
  const resulting = await fetch(`${API_URL}/api/films?populate[1]=cover`)
  const { data } = await resulting.json()

  return data
    .map((film) => {
      const { date, location, visible, key, cover } = film.attributes
      return { key, date, location, visible, cover }
    })
    .filter((film) => film.visible)
}
export function sortFilms(films, orderDesc) {
  return [...films]
    .sort((a, b) => (orderDesc ? a.key - b.key : b.key - a.key))
    .sort((a, b) =>
      orderDesc
        ? Number(new Date(a.date)) - Number(new Date(b.date))
        : Number(new Date(b.date)) - Number(new Date(a.date))
    )
}
export function mod(n, m) {
  return ((n % m) + m) % m
}
