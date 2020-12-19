import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Slide,
    Backdrop,
    CircularProgress,
    Typography,
    InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import api from '../../services/api';
import { getUserData, setToken } from '../../services/authentication';
import useStyles from './styles';

export default function Home() {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [verifyError, setVerifyError] = useState(false);
    const [verifyEmailCode, setVerifyEmailCode] = useState('');
    const [snackbar, setSnackbar] = useState({ isShowing: false, message: '' });

    function handleCloseAlert() {
        setSnackbar({ ...snackbar, isShowing: false });
    }

    function handleClose() {
        setOpenDialog(false);
    }

    function handleVerifyEmailCodeChange(event) {
        setVerifyEmailCode(event.target.value);
    }

    useEffect(() => {
        if (!getUserData().verified) {
            setOpenDialog(true);
        }
    }, []);

    async function handleVerifyEmail() {
        setIsLoading(true);

        try {
            if (!verifyEmailCode) {
                throw new Error('Informe um código de verificação.');
            }

            const response = await api.patch(`/authentication/confirm-email/${verifyEmailCode}`);

            // eslint-disable-next-line camelcase
            const { data, error, refresh_token } = response.data;

            if (error) {
                throw new Error(error.message);
            }

            setToken(refresh_token);
            handleCloseAlert();
            setOpenDialog(false);
            setSnackbar({ isShowing: true, message: data });
        } catch (error) {
            setVerifyError(true);
            setSnackbar({ isShowing: true, message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.logo}>
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/loco_ucycle_small.png`} alt="Logo" />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Busque no uCycle"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Grid>
            <Grid item xs={10} style={{ margin: '0 auto' }}>
                <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/placeholder.jpg`}
                    alt="Placeholder"
                    style={{
                        display: 'block',
                        margin: '60px auto 0 auto',
                        width: '100%',
                    }}
                />
            </Grid>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Verificar e-mail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* eslint-disable-next-line max-len */}
                        Enviamos um código de verificação para o e-mail cadastrado. Use o código aqui para concluir o seu cadastro.
                    </DialogContentText>
                    <Grid container>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            id="number"
                            name="number"
                            type="number"
                            error={verifyError}
                            value={verifyEmailCode}
                            helperText={verifyError && snackbar.message}
                            onChange={
                                (event) => {
                                    handleVerifyEmailCodeChange(event);
                                    setVerifyError(false);
                                }
                            }
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleVerifyEmail} color="primary">
                        Verificar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.isShowing}
                TransitionComponent={Slide}
            >
                <Alert severity="error" onClose={handleCloseAlert}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Backdrop
                open={isLoading}
                style={{ zIndex: 1000, flexDirection: 'column', color: '#ffffff' }}
            >
                <CircularProgress />
                <Typography variant="h5">
                    &nbsp;&nbsp;Verificando...
                </Typography>
            </Backdrop>
        </Grid>
    );
}
