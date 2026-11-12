/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import User from '#models/user'
import Gallery from '#models/gallery'
import Image from '#models/image'


router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').render('pages/dashboard').as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

// Lista todos os usuários
router.get('/users', async () => {
  const users = await User.query().select('id', 'name', 'email', 'createdAt')
  return users
})

// Lista todas as galerias (com o nome do dono)
router.get('/galleries', async () => {
  const galleries = await Gallery.query()
    .preload('user', (query) => {
      query.select('id', 'name', 'email')
    })
    .select('id', 'title', 'description', 'userId', 'createdAt')

  return galleries
});
