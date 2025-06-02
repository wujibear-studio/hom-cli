import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { selectShellType } from '../api/prompts.js'
import FileAPI from '../api/files.js'
import { initContent, sourceDirContent, sourceNamespacesContent, gitignoreContent } from './shell_config_files.js'

export const ShellFileTypes = {
  "alias": 'aliases',
  "export": 'exports',
  "function": 'functions',
  "partial": 'partials',
  "script": 'scripts',
} as const

export type ShellFileType = typeof ShellFileTypes[keyof typeof ShellFileTypes]
const FileTypeValues = Object.values(ShellFileTypes)

export const FileTypeKeys: string[] = Object.keys(ShellFileTypes)

export function dirPaths() {
  // In test environment, use the environment variable
  // In production, always use the standard path
  const isTest = process.env.NODE_ENV === 'test'
  const defaultPath = path.join(os.homedir(), '.hom')
  const homDir = isTest && process.env.HOM_DIR ? process.env.HOM_DIR : defaultPath
  const coreDir = path.join(homDir, '.core')
  return {
    HOM_DIR: homDir,
    CORE_DIR: coreDir,
    GITIGNORE_PATH: path.join(homDir, '.gitignore'),
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
  type?: ShellFileType;
  name?: string;
  settings?: any;
}

export function isTest() {
  return process.env.NODE_ENV === 'test'
}

export function expectedDir({namespace, type, settings}: PathDetails): string {
  const normalizedNamespace = namespace?.length && namespace || settings?.defaultNamespace
  const crumb = [dirPaths().HOM_DIR, normalizedNamespace, type].filter(obj => obj)

  return path.join(...crumb)
}

export function fileName({name}: PathDetails): string {
  return `${name}.sh`
}

export function findFilePath({namespace, type, name, settings}: PathDetails): string | null {
  if (!(type && name)) return null

  const dir = expectedDir({namespace, type, settings})
  const filePath = path.join(dir, fileName({name}))

  return fs.existsSync(filePath) ? filePath : null
}

export function findOrCreateFilePath({namespace, type, name, settings}: PathDetails): string {
  const dir = expectedDir({namespace, type, settings})
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!name) return dir

  return path.join(dir, fileName({name}))
}

// redundant?
export function setupFilePath(filePath: string) {
  // Create all necessary directories in the path
  const dirPath = path.dirname(filePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
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
