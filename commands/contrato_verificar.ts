import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import ContratoService from '#services/contrato_service'

/**
 * Compara la copia fijada del contrato de blog-ai con el OpenAPI que blog-ai publica
 * ahora mismo. Sale con codigo 1 si se han separado, para poder atarlo a integracion
 * continua o a un hook de pre-commit.
 *
 *   node ace contrato:verificar
 */
export default class ContratoVerificar extends BaseCommand {
  static commandName = 'contrato:verificar'
  static description = 'Compara contracts/blog-ai.openapi.json con el OpenAPI vivo de blog-ai'
  static options: CommandOptions = { startApp: true }

  async run() {
    const servicio = new ContratoService()
    const comparacion = await servicio.comparar()

    this.logger.info(`Contrato fijado: contracts/blog-ai.openapi.json`)
    this.logger.info(`  version fijada: ${comparacion.version_fijada ?? '(sin version)'}`)
    this.logger.info(`  huella fijada:  ${comparacion.huella_fijada.slice(0, 16)}`)

    if (comparacion.error) {
      this.logger.error(comparacion.error)
      this.exitCode = 1
      return
    }

    this.logger.info(`  version viva:   ${comparacion.version_viva ?? '(sin version)'}`)
    this.logger.info(`  huella viva:    ${comparacion.huella_viva?.slice(0, 16)}`)

    if (comparacion.coincide) {
      this.logger.success('El contrato fijado coincide con el que sirve blog-ai.')
      return
    }

    this.logger.error(`Deriva de contrato: ${comparacion.diferencias.length} diferencia(s).`)
    for (const diferencia of comparacion.diferencias) {
      this.logger.log(`  [${diferencia.tipo}] ${diferencia.donde} — ${diferencia.detalle}`)
    }
    this.logger.log('')
    this.logger.log(
      'Si el cambio es intencionado: regenera el contrato en blog-ai y copia el archivo.'
    )
    this.exitCode = 1
  }
}
