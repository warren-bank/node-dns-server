const dns2 = require('dns2')

const { TCPClient, Packet } = dns2

// -----------------------------------------------------------------------------
// references:
// -----------------------------------------------------------------------------
// https://github.com/song940/node-dns
// https://github.com/song940/node-dns#client-custom-dns-server
// https://github.com/song940/node-dns#example-server
// https://github.com/song940/node-dns/blob/master/server/dns.js
// https://github.com/song940/node-dns/blob/master/example/server/dns.js
// -----------------------------------------------------------------------------

const process_cli = function(argv_vals){
  process_hosts_file(argv_vals["--hosts-file"])

  const resolve = argv_vals["--fallback-server"]
    ? TCPClient({dns: argv_vals["--fallback-server"]})
    : null

  const server = dns2.createServer({
    udp: true,
    handle: async (request, send, rinfo) => {
      const response = Packet.createResponseFromRequest(request)
      const [ question ] = request.questions
      const { name } = question

      const IP = await resolve_host_name(name, resolve)

      if (IP) {
        response.answers.push({
          name,
          type:    Packet.TYPE.A,
          class:   Packet.CLASS.IN,
          ttl:     300,
          address: IP
        })
      }

      send(response)
    }
  })

  server.on('request', (request, response, rinfo) => {
    if (argv_vals["--debug"])
      console.log(request.header.id, request.questions[0])
  })

  server.on('requestError', (error) => {
    if (argv_vals["--debug"])
      console.log('Client sent an invalid request', error)
  })

  server.on('listening', () => {
    console.log(server.addresses())
  })

  server.on('close', () => {
    console.log('server closed')
  })

  server.listen({
    udp: {
      type:    'udp4',
      address: '0.0.0.0',
      port:    argv_vals["--port"]
    }
  })
}

// -----------------------------------------------------------------------------

const hosts = {
  exact: {},
  regex: []  // [[/host pattern/i, 'IP']]
}

const process_hosts_file = function(hosts_file){
  if (!hosts_file || !(hosts_file instanceof Object)) return

  for (let host_name in hosts_file) {
    const IP = hosts_file[host_name]
    if (!host_name || !IP) continue

    host_name = host_name.toLowerCase()
    if (host_name[0] === '^') {
      try {
        const regex = new RegExp(host_name, 'i')

        hosts.regex.push([regex, IP])
      }
      catch(e) {
        console.log('Hosts file contains an invalid regex pattern:', host_name)
      }
    }
    else {
      hosts.exact[host_name] = IP
    }
  }
}

const resolve_host_name = async function(host_name, resolve){
  host_name = host_name.toLowerCase()

  if (hosts.exact[host_name])
    return hosts.exact[host_name]

  for (let i=0; i < hosts.regex.length; i++) {
    const regex = hosts.regex[i][0]
    const IP    = hosts.regex[i][1]

    if (regex.test(host_name))
      return IP
  }

  if (resolve) {
    const result = await resolve(host_name)

    if (result && Array.isArray(result.answers) && result.answers.length) {
      for (const answer of result.answers) {
        if (answer && (answer instanceof Object) && answer.address && (answer.type === Packet.TYPE.A) && (answer.class === Packet.CLASS.IN)) {
          return answer.address
        }
      }
    }
  }

  return null
}

// -----------------------------------------------------------------------------

module.exports = process_cli
