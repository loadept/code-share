const ogLog = console.log

console.log = (...args: any[]) => {
  const timestamp = new Date().toISOString().replace(/T|Z/g, '')
  process.stdout.write(`${timestamp} `)
  ogLog.apply(console, args)
}
