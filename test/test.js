const assert = require('assert')
const babel = require('@babel/core')
const plugin = require('../index').default
const generate = require('@babel/generator').default

const IMPORT = 'import { h } from "preact";'

const transform = (code) => {
  const result = babel.transform(code, {
    ast: true,
    plugins: [['@babel/syntax-jsx', {pragma: 'h'}], plugin],
  })

  return generate(result.ast).code
}

const normalizeFormatting = (code) => {
  const ast = babel.parse(code, {
    plugins: [['@babel/syntax-jsx', { pragma: 'h' }]],
  })

  return generate(ast).code
}

describe('babel-plugin-preact-import', function () {
  it('adds an import declaration', function () {
    const code = 'const Title = ({ value }) => <h1>{value}</h1>;'

    assert.equal(transform(code), normalizeFormatting(`${IMPORT}\n${code}`))
  })

  it('only adds one import declaration', function () {
    const code = 'console.log(<div />);console.log(<h1 />);'

    assert.equal(transform(code), normalizeFormatting(`${IMPORT}\n${code}`))
  })

  it('does not add an import when h is already in scope', function () {
    const code = 'const h = args => args;const Foo = () => <div />;'

    assert.equal(transform(code), normalizeFormatting(code))
  })

  it('does not add an import when jsx is not used', function () {
    const code = 'console.log(10);'

    assert.equal(transform(code), normalizeFormatting(code))
  })
})
