import { config } from '../api/config.js'
import {select, input} from '@inquirer/prompts'

export async function setShellType(shellType?: string) {
  if (config.settings.shellType) return 

  shellType ||= await select({
    message: "Which shell do you use?",
    choices: [
      {name: 'ZSH', value: 'zsh'},
      {name: 'Bash', value: 'bash'},
    ]
  })

  config.set({shellType})
}

export async function setNamespace(defaultNamespace?: string) {
  defaultNamespace ||= await input({
    message: "Default namespace to use?",
    default: config.settings.defaultNamespace,
    validate: (input) => {
      if (input && input.match(/^[A-Z0-9]{1,20}$/)) {
        return "Need to use only letters or numbers up to 20 characters"
      }

      return true
    }
  })

  config.set({defaultNamespace})
}

export async function setEditor(editor?: string) {
  if (process.env.EDITOR) return

  editor ||= await select({
    message: "What's your favorite code editor?",
    choices: [
      {
        name: 'vim',
        value: 'vim'
      },
      {
        name: 'VS Code',
        value: 'code'
      },
      {
        name: 'other',
        value: 'other'
      }
    ]
  })

  if (editor == 'other') {
    editor = await input({
      message: 'Type the command for your editor'
    })
  }

  config.set({editor})
}