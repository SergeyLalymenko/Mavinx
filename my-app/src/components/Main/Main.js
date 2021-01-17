import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AddIcon from '@material-ui/icons/Add'
import Chip from '@material-ui/core/Chip'
import Pagination from '@material-ui/lab/Pagination'
import './Main.css'



function valuetext(value) {
    return `${value}°C`;
}

function Main() {

    const [cost, setCost] = useState([20, 30]);
    const [currency, setCurrency] = useState('EUR');
    const [page, setPage] = useState(2);
    const [tag, setTag] = useState({
        tag: '',
        name: 'hai',
      });
    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

    function handleSliderChange(event, newValue){
        setCost(newValue);
    };

    function handlePageChange(event, value){
        setPage(value);
    };

    function handleAfterInputChange(event){
        setCost(event.target.value === '' ? [0, cost[1]] : [+event.target.value, cost[1]]);
    };

    function handleAfterBlur(){
        if(cost[0] > cost[1]){
            setCost([cost[1], cost[1]]);
        }else if (cost[0] < 0) {
            setCost([0, cost[1]]);
        } else if (cost[0] > 100) {
            setCost([100, cost[1]]);
        }
    };

    function handleBeforeInputChange(event){
        setCost(event.target.value === '' ? [cost[0], 0] : [cost[0], +event.target.value]);
    };

    function handleBeforeBlur(){
        if(cost[0] > cost[1]){
            setCost([cost[1], cost[1]]);
        }else if (cost[1] < 0) {
            setCost([cost[0], 0]);
        } else if (cost[1] > 100) {
            setCost([cost[0], 100]);
        }
    };

  function handleChange(event){
    setCurrency(event.target.value);
  };

  function handleSelectChange(event){
    const name = event.target.name;
    setTag({
      ...tag,
      [name]: event.target.value,
    });
  };

    return (
        <>
        <Grid container direction="row" className="main-main-grid-conteiner">
            <Grid item lg={1}></Grid>
            <Grid item lg={3}>
                <Grid container direction="row" className="main-margin-top">
                    <Grid item lg={10}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className="main-color-black">Фильтры</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className="main-typography-clear">Очистить</Typography>
                            </Grid>
                        </Grid>
                        <Divider className="main-divider"/>
                        <Typography className="main-color-black main-margin-top">Категории (4)</Typography>
                        <Paper className="main-paper-category">
                        <FormControl className="main-form-control">
                            <InputLabel htmlFor="tag-native-simple">Название</InputLabel>
                            <Select
                                native
                                value={tag.tag}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: 'tag',
                                    id: 'tag-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>#Landing-page</option>
                                <option value={20}>#Логотип</option>
                                <option value={30}>#Промо-сайт</option>
                            </Select>
                        </FormControl>
                        <AddIcon color="primary" className="main-add-icon"/>
                        </Paper>
                        <Chip label="#Landing-page" className="main-ship"/>
                        <Chip label="#Логотип" className="main-ship"/>
                        <Chip label="#Промо-сайт" className="main-ship"/>
                        <Divider className="main-divider"/>
                        <Typography className="main-color-black main-margin-top">Стоимость</Typography>
                        <Paper className="main-paper-cost">
                            <Grid container spacing={2} alignItems="center" className="main-grid-container-slider">
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={currency}
                                        onChange={handleChange}
                                        >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Input
                                        className="main-input"
                                        value={cost[0]}
                                        margin="dense"
                                        onChange={handleAfterInputChange}
                                        onBlur={handleAfterBlur}
                                        inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Input
                                        className="main-input"
                                        value={cost[1]}
                                        margin="dense"
                                        onChange={handleBeforeInputChange}
                                        onBlur={handleBeforeBlur}
                                        inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className="main-slider-item">
                                <Grid item xs>
                                    <Slider
                                        value={cost}
                                        onChange={handleSliderChange}
                                        aria-labelledby="range-slider"
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item lg={2}>
                        <Divider orientation="vertical" flexItem className="main-vertical-divider-left"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={8}>
                <Grid container direction="column" justify="center">
                    <Grid item>
                        <Grid container direction="row" className="main-margin-top">
                            <Grid item>
                                <Typography className="main-typography-find">Найдено</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className="main-typography-amount">(192 Услуги)</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={11}>
                        <Grid container direction="column" justify="center">
                            <Paper className="main-paper">
                                <Grid item>
                                    <Grid container direction="row">
                                        <Grid item lg={9}>
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1}>
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider className="main-divider"/>
                                        <Grid item lg={9} className="main-margin-top">
                                            <Typography variant="h5">Дизайн сайта UI и UX</Typography>
                                            <Typography className="main-advertising-typography">Рекламные компании говорят,что реклама необходима и важна. Она информирует людей о новых продуктах. Рекламные щиты на улицах делеют нашу среду яркой.</Typography>
                                            <Grid container direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Landing-page</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Логотип</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-tages-typography">#Промо-сайт</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={1} className="main-margin-top">
                                            <Divider orientation="vertical" flexItem className="main-vertical-divider"/>
                                        </Grid>
                                        <Grid item lg={2} className="main-margin-top">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <Grid item className="main-grid-cost-item">
                                                    <Typography variant="h5">
                                                        1840$
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className="main-color-black">
                                                        1-2 месяца
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" className="main-page-container">
            <Grid item>
                <Pagination count={10} page={page} onChange={handlePageChange} />
            </Grid>
        </Grid>
        </>
    )
}

export default Main
