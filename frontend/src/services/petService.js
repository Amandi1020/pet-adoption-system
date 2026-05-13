import BASE_URL from './api'

export const getAllPets = async () => {
  const response = await fetch(`${BASE_URL}/pets`)
  const data = await response.json()
  return data
}

export const getAvailablePets = async () => {
  const response = await fetch(`${BASE_URL}/pets/available`)
  const data = await response.json()
  return data
}

export const getPetById = async (id) => {
  const response = await fetch(`${BASE_URL}/pets/${id}`)
  const data = await response.json()
  return data
}

export const addPet = async (pet) => {
  const response = await fetch(`${BASE_URL}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet)
  })
  return response.json()
}

export const updatePet = async (id, pet) => {
  const response = await fetch(`${BASE_URL}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet)
  })
  return response.json()
}

export const deletePet = async (id) => {
  await fetch(`${BASE_URL}/pets/${id}`, {
    method: 'DELETE'
  })
}