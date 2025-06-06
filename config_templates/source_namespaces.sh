#!/usr/bin/env bash

function source_namespaces() {
  setopt +o nomatch # Prevents error messages when there's no folder or files within them
  setopt BASH_REMATCH # allows zsh to handle regex same as bash

  for namespace in $HOM_DIR/*/
  do
    [[ $namespace =~ \.?[a-zA-Z0-9]*\/$ ]]
    stripped_name="${BASH_REMATCH[1]}"

    if [[ $stripped_name && $stripped_name != '.core' ]]
    then
      source_dir "$HOM_DIR$stripped_name"
    fi
  done
}
