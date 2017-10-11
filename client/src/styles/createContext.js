import {create} from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import { createMuiTheme } from 'material-ui/styles';
import { purple, green } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
});

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager: Map<*, *> = new Map();

export default function createContext() {
    return {
        jss,
        theme,
        sheetsManager,
        sheetsRegistry: new SheetsRegistry()
    };
}