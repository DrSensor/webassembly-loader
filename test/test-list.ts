export const exportOptions = {
  all: [
    'instance',
    'module',
    'buffer',
    'async',
    'async-instance',
    'async-module'
  ],
  wasm: {
    lessThan_4KB: ['instance', 'module']
    // moreThan_4KB: ['async-instance', 'async-module', 'async'],
  }
};
