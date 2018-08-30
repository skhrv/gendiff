import renderPlain from './renderPlain';
import renderDiff from './renderDiff';
import renderJSON from './renderJSON';

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
