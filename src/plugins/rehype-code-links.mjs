import { visit } from 'unist-util-visit';

const codeLinkPattern = /\{code-link}\[([^\]]+)]\(([^)]+)\)/;

// Add clickable links inside Markdown code blocks using the format `{code-link}[TEXT](URL)`
export function rehypeCodeLinks() {
  return (tree) => {
    visit(tree, 'element', (preNode) => {
      if (preNode.tagName !== 'pre') return;

      visit(preNode, 'text', (node, index, parent) => {
        if (!codeLinkPattern.test(node.value)) return;

        const re = new RegExp(codeLinkPattern.source, 'g');
        const newNodes = [];
        let lastIndex = 0;
        let match;

        while ((match = re.exec(node.value)) !== null) {
          if (match.index > lastIndex) {
            newNodes.push({
              type: 'text',
              value: node.value.slice(lastIndex, match.index),
            });
          }
          newNodes.push({
            type: 'element',
            tagName: 'a',
            properties: { href: match[2] },
            children: [{ type: 'text', value: match[1] }],
          });
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < node.value.length) {
          newNodes.push({ type: 'text', value: node.value.slice(lastIndex) });
        }

        parent.children.splice(index, 1, ...newNodes);
      });
    });
  };
}
