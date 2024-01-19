import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { selectShellType } from '../api/prompts.js'
const __dirname = path.dirname(process.argv[1])

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

  return path.join(...crumb)
}

export function setupFilePath(filePath: string) {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), {recursive: true})
  }
  return filePath
}

export async function setupShellSourceFiles() {
  fs.mkdirSync(dirPaths().CORE_DIR, {recursive: true})
  const configSource = path.join(__dirname, 'config_templates')
  const gitignoreSource = path.join(configSource, 'gitignore')
  if (!fs.existsSync(dirPaths().GITIGNORE_PATH)) fs.cpSync(gitignoreSource, dirPaths().GITIGNORE_PATH)

  fs.cpSync(configSource, dirPaths().CORE_DIR, {recursive: true, force: true})
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
