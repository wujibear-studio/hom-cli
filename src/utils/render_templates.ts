export const aliasFile = `
#!/usr/bin/env bash
#description: {{description | default: content}}
alias -- {{aliasName}}="{{content}}"
`

export const exportFile = `
#!/usr/bin/env bash
#description: {{description | default: content}}
export {{exportName | upcase}}="{{content}}"
`

export const functionFile = `
#!/usr/bin/env bash
#description: {{description | default: functionName}}

function {{functionName}}() {
  {{content | default: '# NOOP'}}
}
`

export const partialFile = `
#!/usr/bin/env bash
#description: {{description | default: partialName}}

{{content}}
`

export const scriptFile = `
#!/usr/bin/env bash
#description: {{description | default: scriptName}}

{{content}}
`
