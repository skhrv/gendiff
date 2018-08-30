import renderPlain from './renderers/renderPlain';
import renderDiff from './renderers/renderDiff';
import renderJSON from './renderers/renderJSON';

export default (ast, option) => {
  switch (option) {
    case ('json'):
      return renderJSON(ast);
    case ('plain'):
      return renderPlain(ast);
    default:
      return renderDiff(ast);
  }
};
