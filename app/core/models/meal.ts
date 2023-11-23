/* eslint-disable camelcase */
export interface IMealRawData {
  id: string
  name: string
  description: string
  created_at: string
  is_on_diet: number
  user_id: string
}

export class Meal {
  id: string
  name: string
  description: string
  createdAt: string
  isOnDiet: number
  userId: string

  constructor(raw: IMealRawData) {
    this.id = raw.id
    this.name = raw.name
    this.description = raw.description
    this.createdAt = raw.created_at
    this.isOnDiet = raw.is_on_diet
    this.userId = raw.user_id
  }
}
