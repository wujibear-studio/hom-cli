import { ExecInteractive, Exec } from '../api/shell.js'

/**
 * Resolves the editor command to use based on environment variables
 * Falls back through EDITOR -> VISUAL -> platform-specific defaults
 */
export function resolveEditor(): string {
  // Check standard environment variables first
  const editor = process.env.EDITOR || process.env.VISUAL

  if (editor) return editor

  // Platform-specific defaults
  switch (process.platform) {
    case 'darwin':
      return 'nano' // Most macs have nano pre-installed
    case 'win32':
      return 'notepad'
    default:
      return 'vim'
  }
}

/**
 * Opens a file in the user's preferred editor
 * @param filePath - The path to the file to edit
 * @throws Error if the editor command fails
 */
export function openInEditor(filePath: string): void {
  const editor = resolveEditor()
  
  // Special handling for common terminal editors that need proper TTY
  const terminalEditors = ['vim', 'nvim', 'nano', 'emacs', 'vi']
  const isTerminalEditor = terminalEditors.some(e => editor.endsWith(e))

  if (isTerminalEditor) {
    // Terminal editors need TTY inheritance and direct process spawning
    ExecInteractive(editor, [filePath])
  } else {
    // GUI editors can use regular shell execution
    // This allows for shell expansion and editor-specific arguments
    // For example: "code --wait" or "subl -n -w"
    Exec(`${editor} ${filePath}`, {
      onError: (error: Error) => {
        throw new Error(`Failed to open editor: ${error.message}`)
      }
    })
  }
}

/**
 * Checks if the current environment has a valid editor configured
 */
export function hasEditor(): boolean {
  return Boolean(process.env.EDITOR || process.env.VISUAL)
} 