export interface ICreateMeal {
  id: string
  name: string
  description: string
  isOnDiet: boolean
  userId: string
}

export interface IUpdateMeal {
  id: string
  name: string
  description: string
  isOnDiet: boolean
  createdAt: string
}

export interface IDeleteMeal {
  id: string
}

export interface ICreateMealRequest {
  name: string
  description: string
  isOnDiet: boolean
}

export interface ICreateMealCommandInput {
  name: string
  description: string
  isOnDiet: boolean
  sessionId: string
}

export interface IUpdateMealRequest {
  id: string
  name: string
  description: string
  isOnDiet: boolean
  createdAt: string
}

export interface IUpdateMealCommandInput {
  id: string
  name: string
  description: string
  isOnDiet: boolean
  createdAt: string
  sessionId: string
}

export interface IDeleteMealRequest {
  id: string
}

export interface IDeleteMealCommandInput {
  id: string
  sessionId: string
}

export interface IGetMealRequest {
  id: string
}

export interface IGetMealCommandInput {
  id: string
  sessionId: string
}
