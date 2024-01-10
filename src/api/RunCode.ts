import { exec, spawn } from "child_process"

type ExecCallbacks = {
  onError?: Function,
  onStdErr?: Function,
}

export function Exec(
  command: string,
  callbacks: ExecCallbacks = {}
) {
  exec(command, (error, stdout, stderr) => {
    const {onError, onStdErr} = callbacks

    if (error && onError) return onError(error) 
    if (stderr && onStdErr) return onStdErr(stderr) 

    return stdout
  })
}

export function Spawn(
  command: string, 
  onComplete?: Function, 
  onError?: Function,
  onStdErr?: Function,
  onClose?: Function
) {
  const cmd = spawn(command)
  cmd.stdout.on("data", data => onComplete && onComplete(data))
  cmd.stderr.on("data", data => onStdErr && onStdErr(data))
  cmd.on("error", error => onError && onError(error))
  cmd.on("close", code => onClose && onClose(code))
}
