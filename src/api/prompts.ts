import { config } from '../api/config.js'
import {select, input} from '@inquirer/prompts'

export async function selectShellType() {
  let file = await select({
    message: "Which shell file should we append Hom setup to?",
    choices: [
      {name: 'ZSH', value: '.zshrc'},
      {name: 'Bash', value: '.bashrc'},
      {name: 'Other', value: 'other'},
    ]
  })
  if (file == 'other') {
    file = await input({
      message: 'Type the filename we should append Hom setup details to'
    })
  }

  return file
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
    message: "Which code editor do you use?",
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
      message: 'Type the command to open your editor'
    })
  }

  config.set({editor})
}