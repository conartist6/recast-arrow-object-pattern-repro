import recast from "recast";

export default () => {
  return {
    parserOverride(source, parserOpts, babelParse) {
      const _parserOpts = Object.assign({}, parserOpts, {
        // Needed to prevent recast from trying to parse with esprima just to get tokens
        tokens: true,
      });
      return recast.parse(source, {
        parser: {
          parse(source) {
            return babelParse(source, _parserOpts);
          },
        },
      });
    },

    generatorOverride(ast) {
      return recast.print(ast);
    },
  };
};
