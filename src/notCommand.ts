import * as vsc from 'vscode'
import * as ts from 'typescript'

export const NOT_COMMAND = 'complete.notTemplate'

export function notCommand (editor: vsc.TextEditor, position: vsc.Position, suffix: string, expressions: ts.Node[]) {
	vsc.window.showQuickPick(expressions.map(node => ({
		label: node.getText(),
		description: '',
		detail: 'Negate this expression',
		node: node
	})))
		.then(value => {
			return editor.edit(e => {
				const expressionBody = value.node.getText()
				const startPos = new vsc.Position(position.line, position.character - expressionBody.length - suffix.length)
				const range = new vsc.Range(startPos, new vsc.Position(position.line, position.character - suffix.length + 1))

				e.replace(range, `!(${value.label})`)
			})
		})
}
