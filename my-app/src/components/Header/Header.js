import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/actions/actions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import './Header.css'



function Header({logoutUser}) {

    const {push} = useHistory();

    function onAvatarClick(target){
        if(target.previousElementSibling === null){
            addMenuClass(target.parentElement.previousElementSibling);
        }else{
            addMenuClass(target.previousElementSibling);
        }
    }

    function addMenuClass(target){
        target.classList.add('display-flex');
    }

    function onExitMenuClick(target){
        target.parentElement.parentElement.classList.remove('display-flex');
    }

    function onExitClick(){
        let token = localStorage.getItem('token');
        logoutUser(token);
    }

    function onOwnCabinetClick(target){
        onExitMenuClick(target);
        push('/сabinet');
    }

    return (
        <Grid container direction="row" alignItems="center" className="header-main-container">
            <Grid item xs={false} sm={false} md={1} lg={1}>
                <Typography variant="h5" className="header-exprts">Exprts</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem className="header-divider"/>
            <Grid item xs={false} sm={2} md={2} lg={2}>
                <div className="header-search-container">
                    <Autocomplete
                        options={[{ title: 'Option'}]}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                    />
                </div>
            </Grid>
            <Grid item xs={false} sm={false} md={3} lg={4}></Grid>
            <Grid item xs={7} sm={5} md={3} lg={2}>
                <ul className="header-ul">
                    <li className="header-li">Эксперты</li>
                    <li className="header-li">Вопросы</li>
                    <li className="header-li">О нас</li>
                </ul>
            </Grid>
            <Divider orientation="vertical" flexItem className="header-divider"/>
            <Grid item xs={2} sm={2} md={1} lg={1}>
                <Typography className="header-create-project">Создать проект</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem className="header-divider"/>
            <Grid item xs={1} sm={1} md={1} lg={1}>
                <Grid container direction="column">
                    <Grid item>
                        <ul className="header-dropdown">
                            <li className="header-dropdown-li-exit">
                                <Typography className="header-typography-menu" onClick={(e) => onExitMenuClick(e.target)}>X</Typography>
                            </li>
                            <Divider/>
                            <li className="header-dropdown-li">
                                <Typography className="header-typography-menu" onClick={(e) => onOwnCabinetClick(e.target)}>Личный кабинет</Typography>
                            </li>
                            <Divider/>
                            <li className="header-dropdown-li">
                                <Typography className="header-typography-menu" onClick={onExitClick}>Выход</Typography>
                            </li>
                        </ul>
                        <AccountCircleIcon fontSize="large" className="header-account-icon" onClick={(e) => onAvatarClick(e.target)}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

// const mapStateToProps = ({data}) => ({data})

const mapDispatchToProps = {
    logoutUser,
}

export default connect(null, mapDispatchToProps)(Header)
