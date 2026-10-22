import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Custom root HTML layout for Web deployment in Expo Router.
 * Injects Google Fonts (Cormorant Garamond & DM Sans) and metadata.
 */
export default function RootHtml({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5"
        />
        <title>TERRA — A Deeper Way to Travel | Travel Explorer India</title>
        <meta
          name="description"
          content="TERRA — A deeper way to travel. Discover the soul of India through curated beaches, mountains, heritage sanctuaries, and Himalayan adventures."
        />
        <meta name="theme-color" content="#F4EFE6" />

        {/* Preconnect & Load Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #F4EFE6;
              color: #252B24;
              font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            * {
              box-sizing: border-box;
            }
            /* Custom smooth scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            ::-webkit-scrollbar-track {
              background: #F4EFE6;
            }
            ::-webkit-scrollbar-thumb {
              background: #DDD4C4;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #858B70;
            }
            ::selection {
              background-color: #B96548;
              color: #FAF7F2;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
