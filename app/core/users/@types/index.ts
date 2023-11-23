export interface ICreateUser {
  id: string
  name: string
  email: string
  password: string
}

export interface ICreateUserRequest {
  name: string
  email: string
  password: string
}

export type ILoginInput = Pick<ICreateUserRequest, 'email' | 'password'>

export interface IListMealsRequest {
  userId: string
}

export interface IListMealsCommandInput {
  userId: string
  sessionId: string
}

export interface IMetricsRequest {
  userId: string
}

export interface IMetricsCommandInput {
  userId: string
  sessionId: string
}

export interface IMetricsResponse {
  totalMeals: number
  totalMealsOnDiet: number
  totalMealsOutDiet: number
  bestDietSequence: number
}

export interface ITotalMeals {
  totalMeals: number
}

export interface ITotalMealsOnDiet {
  totalMealsOnDiet: number
}

export interface ITotalMealsOutDiet {
  totalMealsOutDiet: number
}
