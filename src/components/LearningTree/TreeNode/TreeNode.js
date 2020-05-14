import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles } from './TreeNode.styles';

const TreeNode = ({ className, nodeData }) => {
    const classes = useStyles();

    return (
        <div className={className}>
            <Tooltip disableHoverListener={!nodeData.attributes} arrow title={
                <div>
                    <Typography>
                        Studied by:
                    </Typography>
                    <List dense={true}>
                        {nodeData.attributes ? nodeData.attributes.map(attribute => (
                            <ListItem>
                                <ListItemText>{attribute}</ListItemText>
                            </ListItem>
                        )) : ''}
                    </List>
                </div>
            }>
                <Paper elevation={3} className={classes.nodePaper}>
                    <Typography>
                        {nodeData.name}
                    </Typography>
                </Paper>
            </Tooltip>

        </div>
    )
}

export default TreeNode;
