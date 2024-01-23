import {Liquid} from 'liquidjs'
import { aliasFile, exportFile, functionFile, scriptFile, partialFile } from '../utils/render_templates.js'

export async function renderTemplate(template: string, options: Object) {
  const engine = new Liquid()
  let templateStr = ''
  switch(template) {
    case 'alias':
      templateStr = aliasFile
      break
    case 'export':
      templateStr = exportFile
      break
    case 'function':
      templateStr = functionFile
      break
    case 'script':
      templateStr = scriptFile
      break
    case 'partial':
      templateStr = partialFile
      break
    default:
      console.error("Didn't pass a valid value to renderTemplate()")
  }

  return await engine.parseAndRenderSync(templateStr, options)
}
