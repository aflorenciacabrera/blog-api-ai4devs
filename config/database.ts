import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env'

const dbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        // Los tests usan su propio archivo: correrlos no puede borrar la base de desarrollo.
        filename: app.tmpPath(
          env.get('NODE_ENV') === 'test' ? 'db.test.sqlite3' : 'db.sqlite3'
        ),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig