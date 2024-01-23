import {Command, Flags} from '@oclif/core'
import { settings } from './api/config.js';
import { FileTypeKeys } from './utils/files.js';
import { ShellFileTypes } from './utils/files.js';

export abstract class NamespacedCommand extends Command {
  static baseFlags = {
    namespace: Flags.string({
      char: 'n',
      description: 'namespace directory to use',
      default: settings.defaultNamespace,
    }),
  };
}

function exclusiveTo(typeKey: string) {
  return FileTypeKeys.filter(key => key != typeKey)
}

export const RequiredTypeFlags = {
  alias: Flags.boolean({ char: 'a', exactlyOne: exclusiveTo('alias') }),
  export: Flags.boolean({ char: 'e', exactlyOne: exclusiveTo('export') }),
  function: Flags.boolean({ char: 'f', exactlyOne: exclusiveTo('function') }),
  partial: Flags.boolean({ char: 'p', exactlyOne: exclusiveTo('partial') }),
  script: Flags.boolean({ char: 's', exactlyOne: exclusiveTo('script') }),
}

export const ExclusiveTypeFlags = {
  alias: Flags.boolean({ char: 'a', exclusive: exclusiveTo('alias') }),
  export: Flags.boolean({ char: 'e', exclusive: exclusiveTo('export') }),
  function: Flags.boolean({ char: 'f', exclusive: exclusiveTo('function') }),
  partial: Flags.boolean({ char: 'p', exclusive: exclusiveTo('partial') }),
  script: Flags.boolean({ char: 's', exclusive: exclusiveTo('script') }),
}


export function typeForExclusiveFlags(flagType: Object) {
  // @ts-ignore
  return ShellFileTypes[Object.keys(flagType)[0]]
}