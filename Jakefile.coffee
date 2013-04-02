{spawn} = require 'child_process'
path = require 'path'
fs = require 'fs'

TS_FILE = 'toast.ts'
JS_FILE = 'toast.js'
EXEC_PRINT_OPTS = printStdout: true, printStderr: true
HEADER_COMMENT = """// Compiled from: #{TS_FILE}
                    // https://github.com/srackham/toast.js
                    """
# Prepend header to compiled JavaScript file.
writeHeader = ->
  fs.writeFileSync JS_FILE, "#{HEADER_COMMENT}\n#{fs.readFileSync JS_FILE}"

desc 'List Jake tasks.'
task 'default', -> jake.exec ['jake -T'], EXEC_PRINT_OPTS

desc 'Compile TypeScript source.'
task 'build', ->
  jake.exec ["tsc --declaration #{TS_FILE}"], ->
        writeHeader()
        complete()

desc 'Push project to github.'
task 'push', ->
  console.log 'pushing to github...'
  jake.exec ['git push --tags origin master'], EXEC_PRINT_OPTS

