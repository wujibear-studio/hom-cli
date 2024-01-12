import {Command, Flags} from '@oclif/core'
import { settings } from './api/config.js';

export abstract class NamespacedCommand extends Command {
  static baseFlags = {
    namespace: Flags.string({
      char: 'n',
      description: 'namespace directory to use',
      default: settings.defaultNamespace,
    }),
  };
}
