import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import {settings} from '../api/config.js'

interface PathDetails {
  namespace?: string;
  type?: string;
  name?: string;
}

export const homDir = path.join(os.homedir(), '.hom')

export function namespaceDir(namespace: string): string {
  return path.join(homDir, namespace)
}

export function closestPath({namespace, type, name}: PathDetails): string {
  if (!namespace && type) namespace = settings.defaultNamespace
  const crumb = [homDir]
  namespace && crumb.push(namespace)
  namespace && type && crumb.push(type)
  namespace && type && name && crumb.push(`${name}.sh`)

  return crumb.join('/')
}

export const setupFilePath = (filePath: string) => {
  const pathValue = path.join(homDir, filePath)
  if (!fs.existsSync(path.dirname(pathValue))) {
    fs.mkdirSync(path.dirname(pathValue))
  }
  
  return pathValue
}

function listNamespaces(): string[] {
  const files = fs.readdirSync(homDir)

  return files.reduce((acc: string[], file) => {
    console.log('spit file', file)
    const filePath = path.join(homDir, file)
    if (fs.lstatSync(filePath).isDirectory()) acc.push(filePath)

    return acc
  }, [])
}

function listFiles() {
} 
