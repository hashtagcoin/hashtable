'use strict'

const delimiter = require('../config.json').keys.delimiter
const filterJoinSegments = require('../utils/filter-join')(delimiter)
const executeOperation = require('../execute')

async function readSubdocument({ bucket }, params = {}, options) {
  let {prefix = '', path} = options
  let key = filterJoinSegments(prefix, params.id)
  let subpath = path + (!isNaN(params.index) ? `[${params.index}]` : '')
  let lookup = bucket.lookupIn(key).get(subpath)
  let result = await executeOperation(lookup)

  return result.value[subpath]
}

module.exports = readSubdocument
