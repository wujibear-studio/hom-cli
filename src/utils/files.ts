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

export const HOM_DIR = path.join(os.homedir(), '.hom')
export const CORE_DIR = path.join(HOM_DIR, '.core')
const GITIGNORE_PATH = path.join(HOM_DIR, '.gitignore')
const SOURCE_LINE = `source ${CORE_DIR}/init.sh`

export function namespaceDir(namespace: string): string {
  return path.join(HOM_DIR, namespace)
}

export interface PathDetails {
  namespace?: string;
  type?: string;
  name?: string;
}

export function closestPath({namespace, type, name}: PathDetails): string {
  const crumb = [HOM_DIR]
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

export function listNamespaces(): string[] {
  const files = fs.readdirSync(HOM_DIR)

  return files.reduce((acc: string[], file) => {
    const filePath = path.join(HOM_DIR, file)
    const isDir = fs.lstatSync(filePath).isDirectory()
    if (isDir && !file.match(/^\./)) acc.push(file)

    return acc
  }, [])
}

export function listFiles() {
} 

export async function setupShellSourceFiles() {
  fs.mkdirSync(CORE_DIR, {recursive: true})
  if (!fs.existsSync(GITIGNORE_PATH)) fs.cpSync(`${process.cwd()}/config_templates/gitignore`, GITIGNORE_PATH)

  fs.cpSync(`${process.cwd()}/config_templates`, CORE_DIR, {recursive: true, force: true})
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
  if (!fs.existsSync(chosenProfile)) return fs.writeFileSync(chosenProfile, SOURCE_LINE)
  fs.appendFileSync(chosenProfile, SOURCE_LINE)
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

  return `${data}`.match(SOURCE_LINE)
}
