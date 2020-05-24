import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import { useStyles } from './TreeNode.styles';

const TreeNode = ({ className, nodeData }) => {
    const classes = useStyles();

    return (
        <div className={className}>
            <Tooltip disableHoverListener={!nodeData.attributes} arrow title={
                <div>
                    <Typography>
                        {nodeData.attributes && nodeData.attributes.people && nodeData.attributes.people.length ? 'Studied by:' : 'Studied by no one' }
                    </Typography>
                    <List dense={true}>
                        {nodeData.attributes && nodeData.attributes.people && nodeData.attributes.people.length ? nodeData.attributes.people.map((attribute, index) => (
                            <ListItem key={index}>
                                <ListItemText>{attribute}</ListItemText>
                            </ListItem>
                        )) : ''}
                    </List>
                </div>
            }>
                <Paper elevation={3} className={classes.nodePaper}>
                    <Typography>
                        {nodeData.attributes && nodeData.attributes.people ? <Chip className={classes.chip} label={nodeData.attributes.people.length} color={nodeData.attributes.people.length > 0 ? "primary" : "secondary"}/>: ''}{nodeData.name}
                    </Typography>
                </Paper>
            </Tooltip>

        </div>
    )
}

export default TreeNode;
