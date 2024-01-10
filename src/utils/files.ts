import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import {settings} from '../api/config.js'

export const ShellFileTypes = {
  alias: 'aliases',
  export: 'exports',
  function: 'functions',
  partial: 'partials',
  script: 'scripts',
}

export const homDir = path.join(os.homedir(), '.hom')

export function namespaceDir(namespace: string): string {
  return path.join(homDir, namespace)
}

export interface PathDetails {
  namespace?: string;
  type?: string;
  name?: string;
}

export function closestPath({namespace, type, name}: PathDetails): string {
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

export function listNamespaces(): string[] {
  const files = fs.readdirSync(homDir)

  return files.reduce((acc: string[], file) => {
    console.log('spit file', file)
    const filePath = path.join(homDir, file)
    if (fs.lstatSync(filePath).isDirectory()) acc.push(filePath)

    return acc
  }, [])
}

export function listFiles() {
} 
