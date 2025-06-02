# This is a wrapper around the OCLIF hom command
# It sources the .zshrc file after the command is run
hom() {
  # Using 'command hom' here prevents recursive function calls
  command hom "$@"

  local exit_code=$?
  local subcommand=$1
  local reload_commands=("alias" "edit" "export" "function" "move" "mv" "partial" "remove" "rm" "script")
  
  # Reload shell source
  if [[ " ${reload_commands[@]} " =~ " ${subcommand} " ]]; then
    local rc_file=""
    case "$SHELL" in
      */zsh) rc_file="$HOME/.zshrc" ;;
      */bash) rc_file="$HOME/.bashrc" ;;
      *) rc_file="$HOME/.profile" ;;
    esac

    source "$rc_file"
  fi
  
  return $exit_code
}
