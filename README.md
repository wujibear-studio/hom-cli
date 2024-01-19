HöM CLI
=================

The `hom` CLI gives you tools to manage and organize your personal utility scripts. Create your own namepsaced scripts, aliases, exports, functions, and partials often without needing to open an editor. Utilities you create are organized by type e.g., `~/.hom/NAMESPACE/aliases/YOUR_ALIAS.sh`

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hom-cli
$ hom COMMAND
running command...
$ hom (--version)
hom-cli/0.0.7 darwin-x64 node-v20.10.0
$ hom --help [COMMAND]
USAGE
  $ hom COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hom alias NAME CONTENT`](#hom-alias-name-content)
* [`hom debug`](#hom-debug)
* [`hom edit [NAME]`](#hom-edit-name)
* [`hom export NAME CONTENT`](#hom-export-name-content)
* [`hom function [NAME]`](#hom-function-name)
* [`hom help [COMMANDS]`](#hom-help-commands)
* [`hom install`](#hom-install)
* [`hom list [NAME]`](#hom-list-name)
* [`hom ls [NAME]`](#hom-ls-name)
* [`hom partial [NAME]`](#hom-partial-name)
* [`hom plugins`](#hom-plugins)
* [`hom plugins:install PLUGIN...`](#hom-pluginsinstall-plugin)
* [`hom plugins:inspect PLUGIN...`](#hom-pluginsinspect-plugin)
* [`hom plugins:install PLUGIN...`](#hom-pluginsinstall-plugin-1)
* [`hom plugins:link PLUGIN`](#hom-pluginslink-plugin)
* [`hom plugins:uninstall PLUGIN...`](#hom-pluginsuninstall-plugin)
* [`hom plugins reset`](#hom-plugins-reset)
* [`hom plugins:uninstall PLUGIN...`](#hom-pluginsuninstall-plugin-1)
* [`hom plugins:uninstall PLUGIN...`](#hom-pluginsuninstall-plugin-2)
* [`hom plugins update`](#hom-plugins-update)
* [`hom run [NAME]`](#hom-run-name)
* [`hom script [NAME]`](#hom-script-name)
* [`hom set`](#hom-set)
* [`hom update [CHANNEL]`](#hom-update-channel)
* [`hom version`](#hom-version)

## `hom alias NAME CONTENT`

creates a command line alias

```
USAGE
  $ hom alias NAME CONTENT [-n <value>]

ARGUMENTS
  NAME     the call name of your alias
  CONTENT  the content of your alias

FLAGS
  -n, --namespace=<value>  [default: user] namespace directory to use

DESCRIPTION
  creates a command line alias

EXAMPLES
  $ hom alias alias_name "some kind of content"
```

_See code: [dist/commands/alias.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/alias.ts)_

## `hom debug`

temporary debugging helper

```
USAGE
  $ hom debug

DESCRIPTION
  temporary debugging helper

EXAMPLES
  $ hom debug
```

_See code: [dist/commands/debug.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/debug.ts)_

## `hom edit [NAME]`

sets default hom configurations

```
USAGE
  $ hom edit [NAME] [-n <value>] [-t alias|export|function|partial|script]

ARGUMENTS
  NAME  filename to edit (omit the extension)

FLAGS
  -n, --namespace=<value>  namespace
  -t, --type=<option>      type of files to edit
                           <options: alias|export|function|partial|script>

DESCRIPTION
  sets default hom configurations

EXAMPLES
  $ hom edit -n=mycompany
```

_See code: [dist/commands/edit.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/edit.ts)_

## `hom export NAME CONTENT`

creates a command line export

```
USAGE
  $ hom export NAME CONTENT [-n <value>]

ARGUMENTS
  NAME     the call name of your export (case insensitive)
  CONTENT  the content of your export

FLAGS
  -n, --namespace=<value>  [default: user] namespace directory to use

DESCRIPTION
  creates a command line export

EXAMPLES
  $ hom export export_name "some kind of content"
```

_See code: [dist/commands/export.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/export.ts)_

## `hom function [NAME]`

sets default hom configurations

```
USAGE
  $ hom function [NAME] [-n <value>] [-c <value>] [-d <value>]

ARGUMENTS
  NAME  filename to edit

FLAGS
  -c, --content=<value>      content of the function. Skips opening the editor when given
  -d, --description=<value>  A description of what your function does
  -n, --namespace=<value>    [default: user] namespace directory to use

DESCRIPTION
  sets default hom configurations

EXAMPLES
  $ hom function -n=mycompany
```

_See code: [dist/commands/function.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/function.ts)_

## `hom help [COMMANDS]`

Display help for hom.

```
USAGE
  $ hom help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hom.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/lib/commands/help.ts)_

## `hom install`

installs hom dependencies, sets defaults

```
USAGE
  $ hom install

DESCRIPTION
  installs hom dependencies, sets defaults

EXAMPLES
  $ hom install
```

_See code: [dist/commands/install.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/install.ts)_

## `hom list [NAME]`

sets default hom configurations

```
USAGE
  $ hom list [NAME] [-n <value>]

ARGUMENTS
  NAME  filename to edit (omit the extension)

FLAGS
  -n, --namespace=<value>  namespace

DESCRIPTION
  sets default hom configurations

ALIASES
  $ hom ls

EXAMPLES
  $ hom list -n=mycompany
```

_See code: [dist/commands/list.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/list.ts)_

## `hom ls [NAME]`

sets default hom configurations

```
USAGE
  $ hom ls [NAME] [-n <value>]

ARGUMENTS
  NAME  filename to edit (omit the extension)

FLAGS
  -n, --namespace=<value>  namespace

DESCRIPTION
  sets default hom configurations

ALIASES
  $ hom ls

EXAMPLES
  $ hom ls -n=mycompany
```

## `hom partial [NAME]`

creates a partial that will be loaded in your shell

```
USAGE
  $ hom partial [NAME] [-n <value>] [-c <value>] [-d <value>]

ARGUMENTS
  NAME  filename to edit

FLAGS
  -c, --content=<value>      content of the function. Skips opening the editor when given
  -d, --description=<value>  A description of what your function does
  -n, --namespace=<value>    [default: user] namespace directory to use

DESCRIPTION
  creates a partial that will be loaded in your shell

EXAMPLES
  $ hom partial -n=mycompany
```

_See code: [dist/commands/partial.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/partial.ts)_

## `hom plugins`

List installed plugins.

```
USAGE
  $ hom plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hom plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/index.ts)_

## `hom plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hom plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hom plugins add

EXAMPLES
  $ hom plugins add myplugin 

  $ hom plugins add https://github.com/someuser/someplugin

  $ hom plugins add someuser/someplugin
```

## `hom plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hom plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hom plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/inspect.ts)_

## `hom plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hom plugins install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hom plugins add

EXAMPLES
  $ hom plugins install myplugin 

  $ hom plugins install https://github.com/someuser/someplugin

  $ hom plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/install.ts)_

## `hom plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ hom plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ hom plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/link.ts)_

## `hom plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hom plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hom plugins unlink
  $ hom plugins remove

EXAMPLES
  $ hom plugins remove myplugin
```

## `hom plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ hom plugins reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/reset.ts)_

## `hom plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hom plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hom plugins unlink
  $ hom plugins remove

EXAMPLES
  $ hom plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/uninstall.ts)_

## `hom plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hom plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hom plugins unlink
  $ hom plugins remove

EXAMPLES
  $ hom plugins unlink myplugin
```

## `hom plugins update`

Update installed plugins.

```
USAGE
  $ hom plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/lib/commands/plugins/update.ts)_

## `hom run [NAME]`

runs one of your saved scripts

```
USAGE
  $ hom run [NAME] [-n <value>]

ARGUMENTS
  NAME  script to run

FLAGS
  -n, --namespace=<value>  [default: user] namespace directory to use

DESCRIPTION
  runs one of your saved scripts

EXAMPLES
  $ hom run -n=mycompany
```

_See code: [dist/commands/run.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/run.ts)_

## `hom script [NAME]`

creates a script that will not be run until you call it

```
USAGE
  $ hom script [NAME] [-n <value>] [-c <value>] [-d <value>]

ARGUMENTS
  NAME  filename to edit

FLAGS
  -c, --content=<value>      content of the script. Skips opening the editor when given
  -d, --description=<value>  A description of what your script does
  -n, --namespace=<value>    [default: user] namespace directory to use

DESCRIPTION
  creates a script that will not be run until you call it

EXAMPLES
  $ hom script -n=mycompany
```

_See code: [dist/commands/script.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/script.ts)_

## `hom set`

sets default hom configurations

```
USAGE
  $ hom set [-r <value>] [-n <value>] [-s <value>]

FLAGS
  -n, --namespace=<value>  default namespace
  -r, --repo=<value>       a git repository to use as a template
  -s, --shell=<value>      shell type

DESCRIPTION
  sets default hom configurations

EXAMPLES
  $ hom set -n=mycompany
```

_See code: [dist/commands/set.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.7/dist/commands/set.ts)_

## `hom update [CHANNEL]`

update the hom CLI

```
USAGE
  $ hom update [CHANNEL] [-a] [--force] [-i | -v <value>]

FLAGS
  -a, --available        See available versions.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the hom CLI

EXAMPLES
  Update to the stable channel:

    $ hom update stable

  Update to a specific version:

    $ hom update --version 1.0.0

  Interactively select version:

    $ hom update --interactive

  See available versions:

    $ hom update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v4.1.8/dist/commands/update.ts)_

## `hom version`

```
USAGE
  $ hom version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
      --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.0.11/lib/commands/version.ts)_
<!-- commandsstop -->
