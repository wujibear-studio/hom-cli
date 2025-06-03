#!/usr/bin/env bash
# Initializes hom for your .bashrc or .zshrc file

export HOM_DIR=$HOME/.hom
export HOM_CORE=$HOM_DIR/.core
export SOURCEABLE_HOM_TYPES=(exports functions partials aliases) # we do NOT source scripts, as hom will run them when called for

source $HOM_CORE/source_namespaces.sh
source $HOM_CORE/source_dir.sh
source $HOM_CORE/hom_command.sh

source_namespaces
