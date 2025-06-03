export const gitignoreContent = `
# Ignore various artifacts
**/.DS_Store
*-debug.log
*-error.log
/.*
`

export const initContent = `
#!/usr/bin/env bash
# Initializes hom for your .bashrc or .zshrc file

export HOM_DIR=$HOME/.hom
export HOM_CORE=$HOM_DIR/.core
export SOURCEABLE_HOM_TYPES=(exports functions partials aliases)

source $HOM_CORE/source_namespaces.sh
source $HOM_CORE/source_dir.sh

source_namespaces
`

export const sourceDirContent = `
#!/usr/bin/env bash

function source_dir() {
  # Prevents error messages when there's no folder or files within them
  setopt +o nomatch

  # Source all custom files within config folders
  for folder in \${SOURCEABLE_HOM_TYPES[@]}
  do
    for file in $1/$folder/*.sh
    do
      if [[ -f $file ]]
      then
        source $file
      fi
    done
  done
}
`

export const sourceNamespacesContent = `
#!/usr/bin/env bash

function source_namespaces() {
  setopt +o nomatch # Prevents error messages when there's no folder or files within them
  setopt BASH_REMATCH # allows zsh to handle regex same as bash
  namespaces=$(ls -d "$HOM_DIR"/*/ 2>/dev/null | xargs -n1 basename)

  for namespace in $namespaces
  do
    [[ $namespace =~ [a-zA-Z0-9]* ]]
    stripped_name="\${BASH_REMATCH[1]}"

    if [[ "$stripped_name/" == $namespace && $stripped_name != 'core' ]]
    then
      source_dir "$HOM_DIR/$stripped_name"
    fi
  done
}
`