const assert = require('assert')
const babel = require('babel-core')
const plugin = require('../index').default

const IMPORT = 'import { h } from "preact";'

const transform = (code) => {
  const result = babel.transform(code, {
    plugins: [['syntax-jsx', {pragma: 'h'}], plugin],
  })

  return result.code
}

describe('babel-plugin-preact-import', function () {
  it('adds an import declaration', function () {
    const code = 'const Title = ({ value }) => <h1>{value}</h1>;'

    assert.equal(transform(code), `${IMPORT}\n${code}`)
  })

  it('only adds one import declaration', function () {
    const code = 'console.log(<div />);console.log(<h1 />);'

    assert.equal(transform(code), `${IMPORT}\n${code}`)
  })

  it('does not add an import when h is already in scope', function () {
    const code = 'const h = args => args;const Foo = () => <div />;'

    assert.equal(transform(code), code)
  })

  it('does not add an import when jsx is not used', function () {
    const code = 'console.log(10);'

    assert.equal(transform(code), code)
  })
})
