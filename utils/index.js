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
export async function getAllCollections() {
  const resulting = await fetch(`${API_URL}/api/collections?populate=*`)
  const { data } = await resulting.json()

  return data.map((film) => {
    console.log(film)
    const { date, isVisible, cover, title, description, images } =
      film.attributes
    return { id: film.id, date, isVisible, cover, title, description, images }
  })
  // .filter((film) => film.visible)
}
export async function getCollectionsList() {
  const resulting = await fetch(`${API_URL}/api/collections?populate[1]=cover`)
  const { data } = await resulting.json()

  return data
    .map((collection) => {
      const { date, title, description, cover } = collection.attributes
      console.log(cover)
      return { id: collection.id, date, title, description, cover: `/collections/${collection.id}/${cover.data.attributes.name}` }
    })
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
function kwdw(iwo) {
  return "heo"

}
