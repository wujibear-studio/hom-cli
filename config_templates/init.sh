#!/usr/bin/env bash
# Initializes hom for your .bashrc or .zshrc file

export HOM_DIR=$HOME/.hom
export HOM_CORE=$HOM_DIR/.core
export SUPPORTED_HOM_TYPES=(exports functions partials aliases scripts)

source $HOM_CORE/source_namespaces.sh
source $HOM_CORE/source_dir.sh

source_namespaces
