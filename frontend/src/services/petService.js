import { apiFetch } from './api'

export const getAllPets = () => apiFetch('/pets', {
  fallbackMessage: 'Failed to load pets.',
})

export const getAvailablePets = () => apiFetch('/pets/available', {
  fallbackMessage: 'Failed to load available pets.',
})

export const getPetById = (id) => apiFetch(`/pets/${id}`, {
  fallbackMessage: 'Pet not found.',
})

export const addPet = (pet) => apiFetch('/pets', {
  method: 'POST',
  body: pet,
  fallbackMessage: 'Failed to add pet.',
})

export const updatePet = (id, pet) => apiFetch(`/pets/${id}`, {
  method: 'PUT',
  body: pet,
  fallbackMessage: 'Failed to update pet.',
})

export const deletePet = (id) => apiFetch(`/pets/${id}`, {
  method: 'DELETE',
  fallbackMessage: 'Failed to delete pet.',
})
