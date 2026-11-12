import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Gallery from './gallery.js'

/**
 * User model ajustado para o schema do Neon
 */
export default class User extends compose(BaseModel, withAuthFinder(hash)) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  /**
   * Coluna real no banco: password_hash
   * O mixin de autenticação usa o nome "password"
   */
  @column({ columnName: 'password_hash', serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relação com as galerias
  @hasMany(() => Gallery)
  declare galleries: HasMany<typeof Gallery>

  /**
   * Retorna as iniciais do usuário
   */
  get initials() {
    if (this.name) {
      const parts = this.name.trim().split(' ')
      const first = parts[0]
      const last = parts.length > 1 ? parts[parts.length - 1] : null

      if (first && last) {
        return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
      }

      return first.slice(0, 2).toUpperCase()
    }

    // fallback pelo email
    const username = this.email.split('@')[0]
    return username.slice(0, 2).toUpperCase()
  }
}