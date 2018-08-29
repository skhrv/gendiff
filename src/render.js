import renderPlain from './renderPlain';
import renderDefault from './renderDefault';

export default (ast, option) => (option === 'plain' ? renderPlain(ast) : renderDefault(ast));
