import React, { useEffect } from 'react'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { updateUser, fetchData } from '../../store/actions/actions'
import { Field, Form, Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import './Cabinet.css'



const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Минимум 2 символа!').max(12, 'Максимум 12 символов!'),
    surname: yup.string().min(2, 'Минимум 2 символа!').max(12, 'Максимум 20 символов!'),
    name_customer: yup.string().min(2, 'Минимум 2 символа!').max(12, 'Максимум 20 символов!'),
    role: yup.number().typeError('Это должно быть число!').min(1, 'Минимум 1!').max(2, 'Максимум 2!'),
})

function Cabinet({data, updateUser, fetchData}){

    useEffect(() => fetchData(), [])

    function renderTextField({field, meta}){
        return (
            <TextField {...field} error={meta.error && meta.touched ? true : false} helperText={meta.touched ? meta.error : ''} label={"Enter " + (field.name)} variant="outlined" size="small" color="primary"/>
        )
    }

    function getInitialValues(){
        let role = 1;
        if(data.role === 'customer'){
            role = 2;
        }
        return {
            name: data.name,
            surname: data.surname,
            name_customer: data.name_customer,
            role: role,
        }
    }

    function onFormikSubmit(values){
        let token = localStorage.getItem('token');
        updateUser(values, token);
        setTimeout(() => fetchData(), 1000);
    }

    function renderForm(){
        return (
            <Form>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Field name="name">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="surname">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="name_customer">{renderTextField}</Field>
                    </Grid>
                    <Grid item>
                        <Field name="role">{renderTextField}</Field>
                    </Grid>
                    <Button type="submit" color="primary" variant="outlined" startIcon={<CheckIcon/>}>Сохранить</Button>
                </Grid>
            </Form>
        )
    }

    return (
        <Grid container justify="center" className="cabinet-main-container">
            <Grid item>
                <Paper className="cabinet-paper">
                    {data.name ? (
                        <Formik initialValues={getInitialValues()} onSubmit={onFormikSubmit} validationSchema={validationSchema}>
                            {renderForm}
                        </Formik>
                    ) : 'Загрузка...'}
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = ({data}) => ({data})

const mapDispatchToProps = {
    updateUser,
    fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet)
