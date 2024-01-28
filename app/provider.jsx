'use client'
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { ChakraProvider } from '@chakra-ui/react'
const styles = {
    global: (props) => ({
        body: {
            color: mode("gray.800", "whiteAlpha.900")(props),
            bg: mode("gray.100", "#101010")(props),
        },
    }),
};

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

const colors = {
    gray: {
        light: "#616161",
        dark: "#1e1e1e",
    },
};
const theme = extendTheme({ config, styles, colors });


const Provider = ({ children }) => {
    return <ChakraProvider theme={theme} >
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
    </ChakraProvider>
}

export default Provider;