import { Request, Response } from 'express'
import Store, { IStore } from '../models/Store'

interface StoreSuccessMany {
  statusCode: number
  stores: IStore[]
}

interface StoreSuccess {
  statusCode: number
  store: IStore
}

interface StoreInput {
  name: IStore['name']
  address: IStore['address']
}

interface StoreFailure {
  statusCode: number
  message: string
}

export const getStores = async (_: Request, res: Response) => {
  try {
    const stores: IStore[] = await Store.find()
    res.status(200).json({ statusCode: 200, stores } as StoreSuccessMany)
  } catch (err) {
    res
      .status(500)
      .json({ statusCode: 500, message: 'Server Error' } as StoreFailure)
  }
}

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, address } = <StoreInput>req.body
    const store: IStore = await Store.create({ name, address })
    res.status(201).send({ statusCode: 201, store } as StoreSuccess)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ statusCode: 500, message: 'Server Error' } as StoreFailure)
  }
}
