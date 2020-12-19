import React from 'react';
import {
    Avatar,
    Grid, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { ExitToApp } from '@material-ui/icons';
import { getUserData, logout } from '../../services/authentication';
import useStyles from './styles';

export default function Profile() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.banner}>
                <div className={classes.avatarContainer}>
                    <Avatar
                        alt="Foto de Perfil"
                        src={`${process.env.REACT_APP_ASSETS_URL}/profile-placeholder.jpg`}
                        className={classes.avatar}
                    />
                    <Typography className={classes.avatarText}>
                        Olá,&nbsp;
                        {getUserData().full_name.split(' ')[0]}
                        !
                    </Typography>
                </div>
                <IconButton className={classes.cameraButton}>
                    <CameraAltIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <List component="nav" aria-label="continue purchases sales configurations help quit" style={{ marginTop: 128 }}>
                    <ListItem button>
                        <ListItemText primary="Continue comprando" />
                        <ListItemIcon>
                            <ShoppingCartIcon fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Minhas compras" />
                        <ListItemIcon>
                            <LocalMallIcon fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Minhas vendas" />
                        <ListItemIcon>
                            <StorefrontIcon fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Configurações" />
                        <ListItemIcon>
                            <SettingsIcon fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Ajuda" />
                        <ListItemIcon>
                            <ContactSupportIcon fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={() => logout()}>
                        <ListItemText primary="Sair" />
                        <ListItemIcon>
                            <ExitToApp fontSize="large" />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}
