//
// Code adapted from https://github.com/vslinko/babel-plugin-react-require
//

export default function ({ types: t }) {
  return {
    visitor: {
      JSXElement (_, { file }) {
        file.set('hasJSX', true)
      },

      Program: {
        enter (_, { file }) {
          file.set('hasJSX', false)
        },

        exit ({ node, scope }, { file }) {
          if (!(file.get('hasJSX') && !scope.hasBinding('h'))) {
            return
          }

          const importDeclaration = t.importDeclaration(
            [
              t.importSpecifier(t.identifier('h'), t.identifier('h'))
            ],
            t.stringLiteral('preact')
          )

          node.body.unshift(importDeclaration)
        }
      }
    }
  }
}
