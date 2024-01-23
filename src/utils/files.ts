import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { selectShellType } from '../api/prompts.js'
import FileAPI from '../api/files.js'
import { initContent, sourceDirContent, sourceNamespacesContent, gitignoreContent } from './templates.js'

export const ShellFileTypes = {
  "alias": 'aliases',
  "export": 'exports',
  "function": 'functions',
  "partial": 'partials',
  "script": 'scripts',
}

export const FileTypeKeys: string[] = Object.keys(ShellFileTypes)
export const FileTypeValues: string[] = Object.values(ShellFileTypes)

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
  if (type && !FileTypeValues.includes(type)) console.error(`A type of '${type}' was passed but it is not a valid shell type`)
  const crumb = [dirPaths().HOM_DIR]
  namespace && crumb.push(namespace)
  // @ts-ignore
  namespace && type && crumb.push(type)
  namespace && type && name && crumb.push(`${name}.sh`)

  return path.join(...crumb)
}

export function setupFilePath(filePath: string) {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), {recursive: true})
  }
  return filePath
}

export async function setupShellSourceFiles() {
  const {GITIGNORE_PATH} = dirPaths()
  if (!fs.existsSync(GITIGNORE_PATH)) new FileAPI(GITIGNORE_PATH).write(gitignoreContent)

  createConfigFile('init.sh', initContent)
  createConfigFile('source_dir.sh', sourceDirContent)
  createConfigFile('source_namespaces.sh', sourceNamespacesContent)
}

async function createConfigFile(fileName: string, content: string) {
  const {CORE_DIR} = dirPaths()
  fs.mkdirSync(CORE_DIR, {recursive: true})
  new FileAPI(path.join(CORE_DIR, fileName)).write(content)
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
