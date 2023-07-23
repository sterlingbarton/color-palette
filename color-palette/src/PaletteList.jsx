import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import MiniPalette from './MiniPalette'
import './styles/PaletteList.css'

export default function PaletteList({palettes, deletePalette}) {
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    const navigate = useNavigate()

    const openDialog = (id) => {
        setOpenDeleteDialog(true);
        setDeleteId(id);
    };

    const closeDialog = () => {
        setOpenDeleteDialog(false);
        setDeleteId("");
    };

    const handleDelete = () => {
        deletePalette(deleteId);
        closeDialog();
    };

    function goToPalette(id) {
        navigate(`/palette/${id}`)
    }

  return (
    <div className='palette-list-root'>
        <div className='palette-list-container'>
            <nav className='palette-list-nav'>
                <h1 className='palette-list-title'>React Colors</h1>
                <Link to='/palette/new'>Create Palette</Link>
            </nav>
            <TransitionGroup className='palette-list-palettes'>
                {palettes.map((palette) => {
                    return <CSSTransition 
                                key={palette.id}
                                timeout={500}
                                classNames='fade'
                                >
                                <MiniPalette 
                                    key={palette.paletteName}
                                    id={palette.id} 
                                    palette={palette} 
                                    openDialog={openDialog}
                                    goToPalette={goToPalette}
                                />
                            </CSSTransition>
                })}
            </TransitionGroup>
        </div>
        <Dialog
                open={openDeleteDialog}
                onClose={closeDialog}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete This Palette?
                </DialogTitle>
                <List>
                    <ListItem disableGutters>
                        <ListItemButton onClick={handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        background: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton onClick={closeDialog}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        background: red[100],
                                        color: red[600],
                                    }}
                                >
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
    </div>
  )
}

