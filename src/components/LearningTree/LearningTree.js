import React, { useEffect, useState } from 'react'
import Tree from 'react-d3-tree';


const LearningTree = ({ learningDays }) => {

    const [data, setData] = useState([
        {
            name: 'Top Level'
        }
    ]);

    useEffect(() => {
        console.log(learningDays);
        const processedData = prepareData(learningDays);
        setData(processedData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [learningDays])

    const prepareData = (days) => {
        console.log(days);
        const topics = [];
        days.forEach(learningDay => {
            learningDay.topics.forEach(topic => {
                const existingTopicId = topics.findIndex(t => t.id === topic.id);
                const person = `${learningDay.firstName} ${learningDay.lastName}`;
                if (existingTopicId < 0) {
                    const peopleExtension = {people: [person]};
                    const newTopic = Object.assign(topic, peopleExtension);
                    console.log(newTopic);
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
            name: 'Root',
            children: []
        };

        console.log(topics);

        mainTopics.forEach(topic => {
            const subtopicsOfTopic = subTopics.filter(subtopic => subtopic.parentId === topic.id);
            tree.children.push({
                name: topic.title,
                attributes: topic.people,
                children: subtopicsOfTopic.map(subtopic => {
                    return {name: subtopic.title, attributes: subtopic.people}
                })                
            })
        })

        return tree;
    }
    return (
        <div id="treeWrapper" style={{ width: '100%', height: '1200px' }}>

            <Tree data={data} />

        </div>
    )
}

export default LearningTree