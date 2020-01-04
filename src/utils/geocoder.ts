import NodeGeocoder, { Entry } from 'node-geocoder'

const geocoder = NodeGeocoder({
  provider: <'mapquest'>process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.MAPQUEST_CONSUMER_KEY,
})

const convertSearchToCoords = async (address: string): Promise<Entry[]> => {
  try {
    const entry = await geocoder.geocode(address)
    return entry
  } catch (err) {
    throw err
  }
}

export default convertSearchToCoords