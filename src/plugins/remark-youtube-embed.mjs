import { visit } from 'unist-util-visit';

const youtubePattern = /^\{youtube-embed}\[([^\]]+)]$/;

// Embed a YouTube video in Markdown using the format `{youtube-embed}[VIDEO_ID]`
export function remarkYoutubeEmbed() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (
        !parent ||
        node.children.length !== 1 ||
        node.children[0].type !== 'text'
      )
        return;
      const match = node.children[0].value.trim().match(youtubePattern);
      if (!match) return;
      parent.children[index] = {
        type: 'html',
        value: `<iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      };
    });
  };
}
