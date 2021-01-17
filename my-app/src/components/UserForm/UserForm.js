import React from 'react'
import { connect } from 'react-redux'
import { createUser, loginUser } from '../../store/actions/actions'
import * as yup from 'yup'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import './UserForm.css'



const regExp = /^((\+?3)?8)?0\d{9}$/;
let validationSchema;

function checkValidation(hasAccount){
    if(!hasAccount){
        validationSchema = yup.object().shape({
            name: yup.string().required('Обязательное поле!').min(2, 'Минимум 2 символа!').max(12, 'Максимум 12 символов!'),
            surname: yup.string().required('Обязательное поле!').min(2, 'Минимум 2 символа!').max(20, 'Максимум 20 символов!'),
            name_customer: yup.string().required('Обязательное поле!').min(2, 'Минимум 2 символа!').max(20, 'Максимум 20 символов!'),
            email: yup.string().required('Обязательное поле!').min(5, 'Минимум 5 символов!').max(40, 'Максимум 40 символов!'),
            phone: yup.string().matches(regExp, 'Неправильный номер!').required('Обязательное поле!').min(12, 'Минимум 12 символов!').max(13, 'Максимум 13 символов!'),
            role: yup.number().typeError('Это должно быть число!').required('Обязательное поле!').min(1, 'Минимум 1!').max(2, 'Максимум 2!'),
            password: yup.string().required('Обязательное поле!').min(6, 'Минимум 6 символов!').max(20, 'Максимум 20 символов!'),
            password_confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают!').required('Обязательное поле!').min(6, 'Минимум 6 символов!').max(20, 'Максимум 20 символов!'),
        })
    } else {
        validationSchema = yup.object().shape({
            email: yup.string().required('Обязательное поле!').min(5, 'Минимум 5 символов!').max(40, 'Максимум 40 символов!'),
            password: yup.string().required('Обязательное поле!').min(6, 'Минимум 6 символов!').max(20, 'Максимум 20 символов!'),
        })
    }
}

function UserForm({hasAccount, setHasAccount, createUser, loginUser}) {

    const {push} = useHistory();

    checkValidation(hasAccount);

    function toggleHasAccount(){
        setHasAccount(!hasAccount);
    }

    function getEmptyValues(){
        return {
            name: '',
            surname: '',
            name_customer: '',
            email: '',
            phone: '',
            role: '',
            password: '',
            password_confirmation: '',
        }
    }

    function onFormikSubmit(values){
        if(hasAccount){
            loginUser(values);
            push('/main');
        }else {
            toggleHasAccount();
            createUser(values);
        }
    }

    function renderTextField({field, meta}){
        return (
            <TextField {...field} error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function renderPasswordField({field, meta}){
        return (
            <TextField {...field} type="password" error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function renderEmailField({field, meta}){
        return (
            <TextField {...field} type="email" error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function renderPhoneField({field, meta}){
        return (
            <TextField {...field} type="tel" error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function renderForm(){
        return (
            <Form className="user-form-main">
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    {!hasAccount ? <>
                        <Grid item>
                            <Typography>Регистрация</Typography>
                        </Grid>
                        <Grid item>
                            <Field name="name">{renderTextField}</Field>
                        </Grid>
                        <Grid item>
                            <Field name="surname">{renderTextField}</Field>
                        </Grid>
                        <Grid item>
                            <Field name="name_customer">{renderTextField}</Field>
                        </Grid>
                    </> : 
                    <Grid item>
                        <Typography>Авторизация</Typography>
                    </Grid>
                    }
                    <Grid item>
                        <Field name="email">{renderEmailField}</Field>
                    </Grid>
                    {!hasAccount ? <>
                        <Grid item>
                            <Field name="phone">{renderPhoneField}</Field>
                        </Grid>
                        <Grid item>
                            <Field name="role">{renderTextField}</Field>
                        </Grid>
                    </> : ''
                    }
                    <Grid item>
                        <Field name="password">{renderPasswordField}</Field>
                    </Grid>
                    {!hasAccount ? <>
                        <Grid item>
                            <Field name="password_confirmation">{renderPasswordField}</Field>
                        </Grid>
                    </> : ''
                    }
                    <Grid item>
                        {hasAccount ? <Button type="submit" variant="contained" color="primary">Войти</Button> :
                        <Button type="submit" variant="contained" color="primary">Зарегестрироваться</Button>}
                    
                    </Grid>
                    <Grid item>
                        {hasAccount ? <Typography onClick={toggleHasAccount} className="user-form-typography">У меня ещё нет аккаунта</Typography> :
                        <Typography onClick={toggleHasAccount} className="user-form-typography">У меня уже есть аккаунт</Typography>
                        }
                    </Grid>
                </Grid>
            </Form>
        )
    }

    return (
        <Grid container className="user-form-main-container" justify="center">
            <Grid item>
                <Paper className="user-form-paper">
                    <Formik initialValues={getEmptyValues()} onSubmit={onFormikSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                        {renderForm}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {
    createUser,
    loginUser,
}

export default connect(null, mapDispatchToProps)(UserForm)
