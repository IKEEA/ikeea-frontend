import React, { useRef, useEffect, useLayoutEffect, useState, useContext } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { LoadingContext } from '../../context/LoadingContext';
import Tree from 'react-d3-tree';

import TreeNode from './TreeNode/TreeNode';

const LearningTree = ({ learningDays, allTopics }) => {

    const [data, setData] = useState({
        name: 'Top Level'
    });

    const treeWrapperRef = useRef()

    const [translate, setTranslate] = useState();
    const [showAllTopics, setShowAllTopics] = useState(false);
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

        const mainTopics = allTopics.filter(topic => !topic.parentId && showAllTopics ? true : topic.people.length > 0);
        const subTopics = allTopics.filter(topic => topic.parentId && showAllTopics ? true : topic.people.length > 0);

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

    return (
        <div id="treeWrapper" style={{ width: '100%', height: '1200px' }} ref={treeWrapperRef}>
            <ToggleButton selected={showAllTopics} onChange={(e) => handleShowAllChange(e)}>
                Show All Topics
            </ToggleButton>
            <Tree data={data} separation={{ siblings: 1, nonSiblings: 1 }} depthFactor={500} translate={translate} allowForeignObjects
                nodeLabelComponent={{
                    render: <TreeNode className='myLabelComponentInSvg' />,
                    foreignObjectWrapper: {
                        y: -24,
                        overflow: 'visible'
                    }
                }} />
        </div>
    )
}

export default LearningTree