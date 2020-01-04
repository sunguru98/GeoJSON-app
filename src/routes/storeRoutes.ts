import { Router } from 'express'
import { getStores, createStore } from '../controller/storeController'
import { check } from 'express-validator'

const router: Router = Router()

// @route - GET /api/stores
// @desc - Get all stores
// @auth - Public
router.get('/', getStores)

// @route - POST /api/stores
// @desc - Create a store
// @auth - Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('address', 'Address is required')
      .not()
      .isEmpty()
  ],
  createStore
)

module.exports = router
