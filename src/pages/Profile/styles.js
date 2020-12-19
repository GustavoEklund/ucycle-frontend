import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    banner: {
        height: '20vh',
        backgroundColor: '#7A81FF',
        position: 'relative',
    },
    avatarContainer: {
        position: 'absolute',
        top: 'calc(20vh - 64px)',
        left: 32,
        width: 128,
        height: 128,
    },
    avatar: {
        width: 128,
        height: 128,
    },
    avatarText: {
        width: 128,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cameraButton: {
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
}));

export default useStyles;
