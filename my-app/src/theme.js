import { createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'



export default () => createMuiTheme({
    palette: {
        primary: {
           main: blue[400],
        },
        secondary: {
            main: red[400],
        },
    }
})