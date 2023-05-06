import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="ja">
            <Head>
                <meta charSet="utf-8" />
                <title>Reportify</title>
                <base href="/" />
                <meta content="noindex" name="robots" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
