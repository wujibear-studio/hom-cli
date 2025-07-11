HöM CLI
=================

The `hom` CLI gives you tools to manage and organize your personal utility scripts. Create your own namepsaced scripts, aliases, exports, functions, and partials often without needing to open an editor. Utilities you create are organized by type e.g., `~/.hom/NAMESPACE/aliases/YOUR_ALIAS.sh`

## Installation

### Using Homebrew (macOS)
```sh
brew tap wujibear-studio/hom
brew install hom-cli
```

### Using npm
```sh
npm install -g hom-cli
```

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Release Flow](#release-flow)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hom-cli
$ hom COMMAND
running command...
$ hom (--version)
hom-cli/0.0.26 linux-x64 node-v18.20.8
$ hom --help [COMMAND]
USAGE
  $ hom COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hom alias NAME CONTENT`](#hom-alias-name-content)
* [`hom edit [NAME]`](#hom-edit-name)
* [`hom export NAME CONTENT`](#hom-export-name-content)
* [`hom function NAME`](#hom-function-name)
* [`hom help [COMMANDS]`](#hom-help-commands)
* [`hom install`](#hom-install)
* [`hom list`](#hom-list)
* [`hom ls`](#hom-ls)
* [`hom move NAME`](#hom-move-name)
* [`hom mv NAME`](#hom-mv-name)
* [`hom open`](#hom-open)
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
* [`hom remove NAME`](#hom-remove-name)
* [`hom rm NAME`](#hom-rm-name)
* [`hom run [NAME]`](#hom-run-name)
* [`hom script [NAME]`](#hom-script-name)
* [`hom set`](#hom-set)

## `hom alias NAME CONTENT`

creates an alias for your shell

```
USAGE
  $ hom alias NAME CONTENT [-n <value>] [-d <value>]

ARGUMENTS
  NAME     the call name of your alias
  CONTENT  the content of your alias

FLAGS
  -d, --description=<value>  a description for the alias
  -n, --namespace=<value>    [default: user] namespace directory to use

DESCRIPTION
  creates an alias for your shell

EXAMPLES
  $ hom alias alias_name "some kind of content"
```

_See code: [src/commands/alias.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/alias.ts)_

## `hom edit [NAME]`

edits a hom file in your editor

```
USAGE
  $ hom edit [NAME] [-n <value>] [-a | -e | -f | -p | -s]

ARGUMENTS
  NAME  filename to edit (omit the extension)

FLAGS
  -a, --alias
  -e, --export
  -f, --function
  -n, --namespace=<value>  namespace
  -p, --partial
  -s, --script

DESCRIPTION
  edits a hom file in your editor

EXAMPLES
  $ hom edit -n=mycompany
```

_See code: [src/commands/edit.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/edit.ts)_

## `hom export NAME CONTENT`

creates an export for your shell

```
USAGE
  $ hom export NAME CONTENT [-n <value>]

ARGUMENTS
  NAME     the call name of your export (case insensitive)
  CONTENT  the content of your export

FLAGS
  -n, --namespace=<value>  [default: user] namespace directory to use

DESCRIPTION
  creates an export for your shell

EXAMPLES
  $ hom export export_name "some kind of content"
```

_See code: [src/commands/export.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/export.ts)_

## `hom function NAME`

creates a shell function

```
USAGE
  $ hom function NAME [-n <value>] [-c <value>] [-d <value>]

ARGUMENTS
  NAME  filename to edit

FLAGS
  -c, --content=<value>      content of the function. Skips opening the editor when given
  -d, --description=<value>  A description of what your function does
  -n, --namespace=<value>    [default: user] namespace directory to use

DESCRIPTION
  creates a shell function

EXAMPLES
  $ hom function function_name -c "echo $something" -d "this is what it do"
```

_See code: [src/commands/function.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/function.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

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

_See code: [src/commands/install.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/install.ts)_

## `hom list`

lists the docs for shell files within hom

```
USAGE
  $ hom list [-n <value>]

FLAGS
  -n, --namespace=<value>  namespace

DESCRIPTION
  lists the docs for shell files within hom

ALIASES
  $ hom ls

EXAMPLES
  $ hom list -n=mycompany
```

_See code: [src/commands/list.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/list.ts)_

## `hom ls`

lists the docs for shell files within hom

```
USAGE
  $ hom ls [-n <value>]

FLAGS
  -n, --namespace=<value>  namespace

DESCRIPTION
  lists the docs for shell files within hom

ALIASES
  $ hom ls

EXAMPLES
  $ hom ls -n=mycompany
```

## `hom move NAME`

moves a hom file between namespaces

```
USAGE
  $ hom move NAME -d <value> [-n <value>] [-a] [-e] [-f] [-p] [-s]

ARGUMENTS
  NAME  filename to move (omit the extension)

FLAGS
  -a, --alias
  -d, --destination=<value>  (required) destination namespace
  -e, --export
  -f, --function
  -n, --namespace=<value>    [default: user] namespace directory to use
  -p, --partial
  -s, --script

DESCRIPTION
  moves a hom file between namespaces

ALIASES
  $ hom mv

EXAMPLES
  $ hom move FILE_NAME
```

_See code: [src/commands/move.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/move.ts)_

## `hom mv NAME`

moves a hom file between namespaces

```
USAGE
  $ hom mv NAME -d <value> [-n <value>] [-a] [-e] [-f] [-p] [-s]

ARGUMENTS
  NAME  filename to move (omit the extension)

FLAGS
  -a, --alias
  -d, --destination=<value>  (required) destination namespace
  -e, --export
  -f, --function
  -n, --namespace=<value>    [default: user] namespace directory to use
  -p, --partial
  -s, --script

DESCRIPTION
  moves a hom file between namespaces

ALIASES
  $ hom mv

EXAMPLES
  $ hom mv FILE_NAME
```

## `hom open`

opens a shell namespace, or folder in your finder

```
USAGE
  $ hom open [-n <value>] [-a | -e | -f | -p | -s]

FLAGS
  -a, --alias
  -e, --export
  -f, --function
  -n, --namespace=<value>  namespace
  -p, --partial
  -s, --script

DESCRIPTION
  opens a shell namespace, or folder in your finder

EXAMPLES
  $ hom open -n=mycompany
```

_See code: [src/commands/open.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/open.ts)_

## `hom partial [NAME]`

creates a partial to better organize your shell

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
  creates a partial to better organize your shell

EXAMPLES
  $ hom partial -n=mycompany
```

_See code: [src/commands/partial.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/partial.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/index.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/inspect.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/install.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/link.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/reset.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/uninstall.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/update.ts)_

## `hom remove NAME`

removes a shell file

```
USAGE
  $ hom remove NAME [-n <value>] [-a | -e | -f | -p | -s]

ARGUMENTS
  NAME  filename to move (omit the extension)

FLAGS
  -a, --alias
  -e, --export
  -f, --function
  -n, --namespace=<value>  [default: user] namespace directory to use
  -p, --partial
  -s, --script

DESCRIPTION
  removes a shell file

ALIASES
  $ hom rm

EXAMPLES
  $ hom remove FILE_NAME
```

_See code: [src/commands/remove.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/remove.ts)_

## `hom rm NAME`

removes a shell file

```
USAGE
  $ hom rm NAME [-n <value>] [-a | -e | -f | -p | -s]

ARGUMENTS
  NAME  filename to move (omit the extension)

FLAGS
  -a, --alias
  -e, --export
  -f, --function
  -n, --namespace=<value>  [default: user] namespace directory to use
  -p, --partial
  -s, --script

DESCRIPTION
  removes a shell file

ALIASES
  $ hom rm

EXAMPLES
  $ hom rm FILE_NAME
```

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

_See code: [src/commands/run.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/run.ts)_

## `hom script [NAME]`

creates a shell script that will NOT be run until called

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
  creates a shell script that will NOT be run until called

EXAMPLES
  $ hom script -n=mycompany
```

_See code: [src/commands/script.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/script.ts)_

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

<<<<<<< HEAD
_See code: [src/commands/set.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.25/src/commands/set.ts)_
=======
_See code: [src/commands/set.ts](https://github.com/wujibear-studio/hom-cli/blob/v0.0.26/src/commands/set.ts)_

</details>
<

>>>>>>> 8d70ca3 (Bump version to v0.0.26 [skip ci])!-- commandsstop -->
# Release Flow

This project uses a structured release process with automated version management and releases. Here's how it works:

## Branch Structure
- `main`: Production-ready code, only receives merges from `develop`
- `develop`: Integration branch, receives feature branches and manages version bumping
- Feature branches: Created from and merged back into `develop`

## Development Process

1. **Feature Development**
   - Create a feature branch from `develop`
   - Make your changes
   - Open a PR to merge back into `develop`
   - Add ONE of these labels to your PR:
     - `version:patch` - Bug fixes and minor changes
     - `version:minor` - New features (non-breaking)
     - `version:major` - Breaking changes
     - `no-version` - Documentation, tests, etc.

2. **Merging to Develop**
   - PR must pass all tests and lint checks
   - Must have exactly one version-related label
   - When merged, version is automatically bumped according to the PR label
   - Version bump is committed back to `develop`

3. **Release Process**
   - Create a PR from `develop` to `main`
   - When merged, automatically:
     - Creates a GitHub release
     - Publishes to npm
     - Updates Homebrew formula
     - Builds and uploads platform-specific tarballs

## Version Management
Versions follow [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward compatible manner
- PATCH version for backward compatible bug fixes
