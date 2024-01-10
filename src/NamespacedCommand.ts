import {Command, Flags} from '@oclif/core'

export abstract class NamespacedCommand extends Command {
  static baseFlags = {
    namespace: Flags.string({
      char: 'n',
      description: 'namespace directory to use',
      default: 'user',
    }),
  };
}
