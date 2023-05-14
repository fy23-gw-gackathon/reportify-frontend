const withInterceptStdout = require("next-intercept-stdout");
const removeImports = require("next-remove-imports")();
module.exports = removeImports(
    withInterceptStdout(
        {
            reactStrictMode: true,
        },
        (text) => (text.includes("Duplicate atom key") ? "" : text)
    )
);
