import brunoImg from '../assets/images/pets/bruno.jpg'
import lunaImg from '../assets/images/pets/luna.jpg'
import cocoImg from '../assets/images/pets/coco.jpg'
import maxImg from '../assets/images/pets/max.jpg'
import mimiImg from '../assets/images/pets/mimi.jpg'
import sunnyImg from '../assets/images/pets/sunny.jpg'
import bellaImg from '../assets/images/pets/bella.jpg'
import daisyImg from '../assets/images/pets/daisy.jpg'
import kiwiImg from '../assets/images/pets/kiwi.jpg'
import miloImg from '../assets/images/pets/milo.jpg'
import rosiImg from '../assets/images/pets/rosi.jpg'
import dogDefault from '../assets/images/pets/dog-default.jpg'
import catDefault from '../assets/images/pets/cat-default.jpg'
import birdDefault from '../assets/images/pets/bird-default.jpg'
import rabbitDefault from '../assets/images/pets/rabbit-default.jpg'

const petImagesByName = {
  bruno: brunoImg,
  luna: lunaImg,
  coco: cocoImg,
  max: maxImg,
  mimi: mimiImg,
  sunny: sunnyImg,
  bella: bellaImg,
  daisy: daisyImg,
  kiwi: kiwiImg,
  milo: miloImg,
  rosi: rosiImg,
}

const speciesDefaults = {
  Dog: dogDefault,
  Cat: catDefault,
  Bird: birdDefault,
  Rabbit: rabbitDefault,
}

export function getSpeciesFallbackImage(species) {
  return speciesDefaults[species] || dogDefault
}

export function getPetImage(pet) {
  const nameKey = pet?.name?.trim().toLowerCase()
  return pet?.imageUrl?.trim() || petImagesByName[nameKey] || getSpeciesFallbackImage(pet?.species)
}
