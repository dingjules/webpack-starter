const testsContext = require.context('.', true, /^((?!node_modules).)*spec\.js$/);

testsContext.keys().forEach(testsContext);
