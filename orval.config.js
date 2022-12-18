module.exports = {
  'locker-v1': {
    input: {
      target: 'http://wordle-api.vcx.workers.dev/openapi.yaml',
      validation: false,
    },
    output: {
      mode: 'split',
      target: './generated/api/',
      schemas: './generated/dto/',
      client: 'swr',
      mock: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write generated --config ./.prettierrc.json',
    },
  },
};
