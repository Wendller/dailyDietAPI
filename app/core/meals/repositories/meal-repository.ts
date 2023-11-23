import { knex } from '../../../infra/knex-config'
import { IMealRawData } from '../../models/meal'
import { ICreateMeal, IUpdateMeal } from '../@types'

export interface IMealRepository {
  create(data: ICreateMeal): Promise<IMealRawData[]>
  getById(id: string): Promise<IMealRawData>
  update(data: IUpdateMeal): Promise<IMealRawData[]>
  delete(id: string): Promise<void>
}

export default class MealRepository implements IMealRepository {
  async delete(id: string): Promise<void> {
    await knex('meals').delete().where('id', id)
  }

  async update(data: IUpdateMeal): Promise<IMealRawData[]> {
    return await knex('meals')
      .update({
        name: data.name,
        description: data.description,
        is_on_diet: data.isOnDiet,
        created_at: data.createdAt,
      })
      .where({ id: data.id })
      .returning(['id', 'name', 'description', 'is_on_diet', 'created_at'])
  }

  async getById(id: string): Promise<IMealRawData> {
    return await knex('meals').select().where({ id }).first()
  }

  async create(data: ICreateMeal): Promise<IMealRawData[]> {
    return await knex('meals')
      .insert({
        id: data.id,
        name: data.name,
        description: data.description,
        is_on_diet: data.isOnDiet,
        user_id: data.userId,
      })
      .returning(['id', 'name', 'description', 'is_on_diet', 'created_at'])
  }
}
