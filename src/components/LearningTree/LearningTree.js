import React, { useRef, useEffect, useLayoutEffect, useState, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import Tree from 'react-d3-tree';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { useStyles } from './LearningTree.styles';

import TreeNode from './TreeNode/TreeNode';

const LearningTree = ({ learningDays, allTopics }) => {

    const classes = useStyles();

    const [data, setData] = useState({
        name: 'Top Level'
    });

    const treeWrapperRef = useRef()

    const [translate, setTranslate] = useState();
    const [showAllTopics, setShowAllTopics] = useState(false);
    const [showLegend, setShowLegend] = useState(true);
    const [setLoading] = useContext(LoadingContext);

    useEffect(() => {
        const processedData = prepareData(learningDays, false);
        setData(processedData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [learningDays])

    useLayoutEffect(() => {
        if (treeWrapperRef.current) {
            const dimensions = treeWrapperRef.current.getBoundingClientRect();
            setTranslate({
                x: dimensions.width / 10,
                y: dimensions.height / 2
            });
        }
    }, [])

    const prepareData = (days, showAllTopics) => {
        setLoading(true);
        const learnedTopics = [];
        days.forEach(learningDay => {
            learningDay.topics.forEach(topic => {
                const existingTopicId = learnedTopics.findIndex(t => t.id === topic.id);
                const person = `${learningDay.firstName} ${learningDay.lastName}`;
                if (existingTopicId < 0) {
                    const peopleExtension = { people: [person] };
                    const newTopic = Object.assign(topic, peopleExtension);
                    learnedTopics.push(newTopic);
                } else {
                    if (!learnedTopics[existingTopicId].people.find(p => p === person)) {
                        learnedTopics[existingTopicId].people.push(person);
                    }
                }
            })
        });
        allTopics.forEach((topic, index) => {
            const peopleExtension = { people: [] };
            const learnedTopic = learnedTopics.find(t => t.id === topic.id);
            if (learnedTopic) {
                peopleExtension.people = learnedTopic.people;
            }
            allTopics[index] = Object.assign(allTopics[index], peopleExtension);
        })

        const subTopics = allTopics.filter(topic => topic.parentId !== null && (showAllTopics ? true : topic.people.length > 0));

        const mainTopics = allTopics.filter(topic => topic.parentId === null && (showAllTopics ? true : (topic.people.length > 0 || subTopics.filter(subtopic => subtopic.parentId === topic.id && subtopic.people.length > 0).length > 0)));

        let tree = {
            name: 'Top Level',
            attributes: {},
            children: []
        };

        mainTopics.forEach(topic => {
            const subtopicsOfTopic = subTopics.filter(subtopic => subtopic.parentId === topic.id);
            tree.children.push({
                name: topic.title,
                attributes: { people: topic.people },
                children: subtopicsOfTopic.map(subtopic => {
                    return { name: subtopic.title, attributes: { people: subtopic.people } }
                })
            })
        })

        setLoading(false);

        return tree;
    }

    const handleShowAllChange = (e) => {
        const newShowAllTopicsValue = !showAllTopics;
        setShowAllTopics(newShowAllTopicsValue);
        setData(prepareData(learningDays, newShowAllTopicsValue));
    }

    const handleShowLegendChange = (e) => {
        const newShowLegendValue = !showLegend;
        setShowLegend(newShowLegendValue);
    }

    return (
        <Paper id="treeWrapper" className={classes.wrapper} ref={treeWrapperRef}>
            <FormGroup className={classes.formGroup}>
                <FormControlLabel
                    control={<Switch checked={showAllTopics} color="primary" onChange={(e) => handleShowAllChange(e)} />}
                    label="Show All Topics"
                />
                <FormControlLabel
                    control={<Switch checked={showLegend} color="primary" onChange={(e) => handleShowLegendChange(e)} />}
                    label="Show Legend"
                />
            </FormGroup>
            <Paper hidden={!showLegend} className={classes.legend}>
                <div>
                    <List>
                        <ListItem>
                            Each parent node of the "Top Level" node represents a topic.
                        </ListItem>
                        <ListItem>
                            Each parent node of the topic indicates a subtopic of that topic.
                        </ListItem>
                        <ListItem>
                            Parents of the node can be collapsed/expanded by clicking on a node.
                        </ListItem>
                        <ListItem>
                            <Chip className={classes.chip} label={0} color={"secondary"} /> - indicates that no one has studied this topic.
                        </ListItem>
                        <ListItem>
                            <Chip className={classes.chip} label={1} color={"primary"} /> - indicates that a single person has studied this topic.
                        </ListItem>
                        <ListItem>
                            A full list of people that have studied particular topic can be seen by hovering on the node.
                        </ListItem>
                        <ListItem>
                            Enable "Show All Topics" to see all the available topics. By default, only the topics/subtopics that were studied by at least one person are shown.
                        </ListItem>
                    </List>
                </div>
            </Paper>
            <Tree data={data} separation={{ siblings: 1, nonSiblings: 1 }} depthFactor={500} translate={translate} allowForeignObjects
                nodeLabelComponent={{
                    render: <TreeNode className='myLabelComponentInSvg' />,
                    foreignObjectWrapper: {
                        y: -24,
                        overflow: 'visible'
                    }
                }} />
        </Paper>
    )
}

export default LearningTree