import renderPlain from './renderPlain';
import renderDiff from './renderDiff';

export default (ast, option) => {
  switch (option) {
    case ('json'):
      return JSON.stringify(ast, null, 2);
    case ('plain'):
      return renderPlain(ast);
    default:
      return renderDiff(ast);
  }
};
