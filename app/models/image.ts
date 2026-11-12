import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Gallery from './gallery.js'
import User from './user.js'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare galleryId: string

  @column()
  declare userId: string

  @column()
  declare storageKey: string

  @column()
  declare originalName: string

  @column()
  declare mimeType: string

  @column()
  declare sizeBytes: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Gallery)
  declare gallery: BelongsTo<typeof Gallery>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
