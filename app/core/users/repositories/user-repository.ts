import {
  ICreateUser,
  ITotalMeals,
  ITotalMealsOnDiet,
  ITotalMealsOutDiet,
} from '../@types'
import { knex } from '../../../infra/knex-config'
import { IUserRawData } from '../../models/user'
import { IMealRawData } from '../../models/meal'

export interface IUserRepository {
  create(data: ICreateUser): Promise<IUserRawData[]>
  getByEmail(email: string): Promise<IUserRawData>
  getById(id: string): Promise<IUserRawData>
  getBySessionID(sessionID: string): Promise<IUserRawData>
  updateSessionID(id: string, sessionID: string): Promise<void>
  resetSessionID(sessionID: string): Promise<void>
  getMeals(id: string): Promise<IMealRawData[]>
  getTotalMeals(id: string): Promise<ITotalMeals[]>
  getTotalMealsOnDiet(id: string): Promise<ITotalMealsOnDiet[]>
  getTotalMealsOutDiet(id: string): Promise<ITotalMealsOutDiet[]>
  getOrderedMeals(id: string): Promise<IMealRawData[]>
}

export default class UserRepository implements IUserRepository {
  async getOrderedMeals(id: string): Promise<IMealRawData[]> {
    return await knex('meals')
      .where({ user_id: id })
      .orderBy('created_at', 'asc')
  }

  async getTotalMealsOutDiet(id: string): Promise<ITotalMealsOutDiet[]> {
    return await knex('meals')
      .where({ user_id: id })
      .andWhere({ is_on_diet: false })
      .count('id', { as: 'totalMealsOutDiet' })
  }

  async getTotalMealsOnDiet(id: string): Promise<ITotalMealsOnDiet[]> {
    return await knex('meals')
      .where({ user_id: id })
      .andWhere({ is_on_diet: true })
      .count('id', { as: 'totalMealsOnDiet' })
  }

  public async getTotalMeals(id: string): Promise<ITotalMeals[]> {
    return await knex('meals')
      .where({ user_id: id })
      .count('id', { as: 'totalMeals' })
  }

  async getById(id: string): Promise<IUserRawData> {
    return await knex('users').select().where({ id }).first()
  }

  public async getMeals(id: string): Promise<IMealRawData[]> {
    return await knex('users')
      .join('meals', 'users.id', '=', 'meals.user_id')
      .select(
        'meals.id',
        'meals.name',
        'meals.description',
        'meals.is_on_diet',
        'meals.created_at',
      )
      .where({ 'users.id': id })
  }

  public async getBySessionID(sessionID: string): Promise<IUserRawData> {
    return await knex('users').select().where('session_id', sessionID).first()
  }

  public async resetSessionID(sessionID: string): Promise<void> {
    return await knex('users')
      .where('session_id', sessionID)
      .update({ session_id: null })
  }

  public async updateSessionID(id: string, sessionID: string): Promise<void> {
    await knex('users').where('id', id).update({ session_id: sessionID })
  }

  public async create(data: ICreateUser): Promise<IUserRawData[]> {
    return await knex('users')
      .insert({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .returning(['id', 'name', 'email'])
  }

  public async getByEmail(email: string): Promise<IUserRawData> {
    return await knex('users').select().where({ email }).first()
  }
}
