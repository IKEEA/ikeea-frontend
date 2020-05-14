import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tree from 'react-d3-tree';
import { useStyles } from './LearningTree.styles';

import TreeNode from './TreeNode/TreeNode';

const LearningTree = ({ learningDays }) => {

    const [data, setData] = useState({
        name: 'Top Level'
    });

    const treeWrapperRef = useRef()

    const [translate, setTranslate] = useState();

    const classes = useStyles();

    useEffect(() => {
        const processedData = prepareData(learningDays);
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

    const prepareData = (days) => {
        const topics = [];
        days.forEach(learningDay => {
            learningDay.topics.forEach(topic => {
                const existingTopicId = topics.findIndex(t => t.id === topic.id);
                const person = `${learningDay.firstName} ${learningDay.lastName}`;
                if (existingTopicId < 0) {
                    const peopleExtension = { people: [person] };
                    const newTopic = Object.assign(topic, peopleExtension);
                    topics.push(newTopic);
                } else {
                    if (!topics[existingTopicId].people.find(p => p === person)) {
                        topics[existingTopicId].people.push(person);
                    }
                }
            })
        });
        const mainTopics = topics.filter(topic => !topic.parentId);
        const subTopics = topics.filter(topic => topic.parentId);

        let tree = {
            name: 'Top Level',
            children: []
        };

        mainTopics.forEach(topic => {
            const subtopicsOfTopic = subTopics.filter(subtopic => subtopic.parentId === topic.id);
            tree.children.push({
                name: topic.title,
                attributes: topic.people,
                children: subtopicsOfTopic.map(subtopic => {
                    return { name: subtopic.title, attributes: subtopic.people }
                })
            })
        })

        return tree;
    }
    return (
        <div id="treeWrapper" style={{ width: '100%', height: '1200px' }} ref={treeWrapperRef}>
            <Tree data={data} separation={{ siblings: 1, nonSiblings: 1 }} depthFactor={500} translate={translate} allowForeignObjects
                nodeLabelComponent={{
                    render: <TreeNode className='myLabelComponentInSvg' />,
                    foreignObjectWrapper: {
                        y: -20,
                        overflow: 'visible'
                    }
                }} />
        </div>
    )
}

export default LearningTree