'use strict'

const db = require('../server/db')
const {User, Local, Member, LocalAccess} = require('../server/db/models')
const {
  localCongregations,
  extensionCongregations,
  ml,
  secretaries,
  secAccess
} = require('./initLoad')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const locals = await Local.loadData(localCongregations)
  console.log(`seeded ${locals.length} locals`)

  const extensions = await Local.loadData(extensionCongregations)
  console.log(`seeded ${extensions.length} extension`)

  const members = await Member.loadData(ml)
  console.log(`seeded ${members.length} members`)

  const users = await Promise.all(secretaries.map(s => User.create(s)))

  console.log(`seeded ${users.length} users`)

  const privileges = await Promise.all(
    secAccess.map(a => LocalAccess.create(a))
  )

  console.log(`seeded ${privileges.length} privileges`)

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
