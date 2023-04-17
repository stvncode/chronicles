import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api"

import { useLocalStorage } from "@mantine/hooks";
import { MantineProvider, type ColorScheme, ColorSchemeProvider, DEFAULT_THEME } from "@mantine/core"
import { Layout } from "~/components/Layout";

type CustomColor = typeof DEFAULT_THEME.colors & { primary?: [string, string, string, string, string, string, string, string, string, string] }

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: 'color-scheme', defaultValue: 'dark' })

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  const theme = {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      primary: ['#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa', '#9775fa']
    } as CustomColor,
    colorScheme,
    primaryColor: 'primary',
    white: '#efe7db',
    black: '#202023',
    fontFamily: 'futura'
  }

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
