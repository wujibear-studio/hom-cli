#!/usr/bin/env bash

function source_dir() {
  # Prevents error messages when there's no folder or files within them
  setopt +o nomatch

  # Source all custom files within config folders
  for folder in ${SUPPORTED_HOM_TYPES[@]}
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
