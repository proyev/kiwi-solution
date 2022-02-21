export interface Door {
  id: number
  sensor_uuid: string
  name: string
  street: string
  postal_code: string
  city: string
  state: string
  country_code: string
  geolocation: string 
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}