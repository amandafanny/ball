"use client";

import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useMemo, type ReactNode } from "react";
import {
  MantineProvider,
  MantineThemeOverride,
  TextInput,
} from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { RootStyleRegistry } from "../../EmotionRootStyleRegistry";

export function Provider(props: { children: ReactNode }) {
  const myTheme = useMemo(() => {
    return {
      components: {
        TextInput: TextInput.extend({
          defaultProps: {
            styles() {
              return {
                root: {
                  marginTop: "1rem",
                },
                label: {
                  fontSize: "18px",
                  color: "#fff",
                },
                input: {
                  "--input-placeholder-color": "#000",
                  background: "inherit",
                  height: "57px",
                  paddingLeft: "50px",
                  fontSize: "20px",
                  borderColor: "#FFFFFF4D",
                  borderRadius: "100px",
                  color: "#000",
                  fontWeight: 500,
                },
              };
            },
          },
        }),
      },
      other: {
        primaryTextColor: "#1A1A1A",
        secondaryTextColor: "#9A9A9A",
        titleFontSize: "1.5rem",
        normalFontSize: "1rem",
        secondaryFontSize: "0.88rem",
        noticeFontSize: "0.75rem",
      },
      globalStyles: () => {
        return {
          body: {
            overflowX: "hidden",
          },
        };
      },
    } as MantineThemeOverride;
  }, []);
  return (
    <RootStyleRegistry>
      <MantineEmotionProvider>
        <MantineProvider stylesTransform={emotionTransform} theme={myTheme}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
            config={{
              appearance: {
                mode: "auto",
              },
            }}
          >
            {props.children}
          </OnchainKitProvider>
        </MantineProvider>
      </MantineEmotionProvider>
    </RootStyleRegistry>
  );
}
