export interface User {
  fullName: string,
  gender: boolean,
  country: string,
  username: string,
  email: string,
  password: string,
  carInfo: string,
  carNumber: string
}

export interface Rating {
  userId: string,
  rating: boolean,
  note: string,
  ratedUser: string,
  
}
