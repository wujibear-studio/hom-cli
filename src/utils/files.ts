import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { selectShellType } from '../api/prompts.js'

export const ShellFileTypes = {
  alias: 'aliases',
  export: 'exports',
  function: 'functions',
  partial: 'partials',
  script: 'scripts',
}

export const FileTypeKeys = Object.keys(ShellFileTypes)

export function dirPaths() {
  const homDir = '.hom'
  return {
    HOM_DIR: path.join(os.homedir(), homDir),
    CORE_DIR: path.join(os.homedir(), homDir, '.core'),
    GITIGNORE_PATH: path.join(os.homedir(), homDir, '.gitignore'),
  }
}
export function sourceLine() { 
  return `source ${dirPaths().CORE_DIR}/init.sh`
}

export function namespaceDir(namespace: string): string {
  return path.join(dirPaths().HOM_DIR, namespace)
}

export interface PathDetails {
  namespace?: string;
  type?: string;
  name?: string;
}

export function closestPath({namespace, type, name}: PathDetails): string {
  const crumb = [dirPaths().HOM_DIR]
  namespace && crumb.push(namespace)
  namespace && type && crumb.push(type)
  namespace && type && name && crumb.push(`${name}.sh`)

  return crumb.join('/')
}

export function setupFilePath(filePath: string) {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), {recursive: true})
  }
  return filePath
}

export function listNamespaces(): string[] | void {
  if (!fs.existsSync(dirPaths().HOM_DIR)) return console.log('Installation directory missing')
  const files = fs.readdirSync(dirPaths().HOM_DIR)

  return files.reduce((acc: string[], file) => {
    const filePath = path.join(dirPaths().HOM_DIR, file)
    const isDir = fs.lstatSync(filePath).isDirectory()
    if (isDir && !file.match(/^\./)) acc.push(file)

    return acc
  }, [])
}

export function listFiles() {
} 

export async function setupShellSourceFiles() {
  fs.mkdirSync(dirPaths().CORE_DIR, {recursive: true})
  if (!fs.existsSync(dirPaths().GITIGNORE_PATH)) fs.cpSync(`${process.cwd()}/config_templates/gitignore`, dirPaths().GITIGNORE_PATH)

  fs.cpSync(`${process.cwd()}/config_templates`, dirPaths().CORE_DIR, {recursive: true, force: true})
}

/*
 * 1 profile:
 *   - installed? break
 *   - no? install
 * X profiles:
 *   - choose! 
 *   - installed? break
 *   - no? install
 */
export async function installShell() {
  const profiles = installedShellProfiles()
  let chosenProfile = profiles[0]

  if (profiles.length != 1) {
    chosenProfile = await selectShellType()
  }

  if (fs.existsSync(chosenProfile) && profileHasInit(chosenProfile)) return
  if (!fs.existsSync(chosenProfile)) return fs.writeFileSync(chosenProfile, sourceLine())
  fs.appendFileSync(chosenProfile, sourceLine())
}

function installedShellProfiles() {
  const profiles = []
  const bash = path.join(os.homedir(), '.bashrc')
  const zsh = path.join(os.homedir(), '.zshrc')
  if (fs.existsSync(bash)) profiles.push(bash)
  if (fs.existsSync(zsh)) profiles.push(zsh)

  return profiles
}

function profileHasInit(file: string) {

  const data = fs.readFileSync(file)

  return `${data}`.match(sourceLine())
}
