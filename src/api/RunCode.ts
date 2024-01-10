import { exec, spawn } from "child_process"

type ExecCallbacks = {
  onError?: Function,
  onStdErr?: Function,
  onComplete?: Function,
}

export function Exec(
  command: string,
  callbacks: ExecCallbacks = {}
) {
  return exec(command, (error, stdout, stderr) => {
    const {onError, onStdErr, onComplete} = callbacks

    if (error && onError) return onError(error) 
    if (stderr && onStdErr) return onStdErr(stderr) 
    if (stdout && onComplete) return onComplete(stdout) 

    return stdout
  })
}

type SpawnCallbacks = {
  onComplete?: Function, 
  onError?: Function,
  onStdErr?: Function,
  onClose?: Function
}

export function Spawn(
  command: string, 
  callbacks: SpawnCallbacks = {}
) {
  const cmd = spawn(command)
  const {onComplete, onStdErr, onError, onClose} = callbacks

  cmd.stdout.on("data", data => onComplete && onComplete(data))
  cmd.stderr.on("data", data => onStdErr && onStdErr(data))
  cmd.on("error", error => onError && onError(error))
  cmd.on("close", code => onClose && onClose(code))
}
