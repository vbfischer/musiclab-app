import {create} from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import { createMuiTheme } from 'material-ui/styles';
import { purple, green, blueGrey, indigo, grey } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const primaryColor = blueGrey;
const secondaryColor = indigo;

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
        secondary: indigo,
        background: {
            default: blueGrey[50],
            appBar: '#fff'
        }
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