import { useState } from "react";

function TextHolder() {
    const tOne = 'This course provides a comprehensive introduction to church history, biblical studies, and theological foundations. Designed for both beginners and those seeking to deepen their understanding, the curriculum covers key topics including the early church, the development of Christian doctrine, and practical applications for modern faith. Each session includes interactive discussions, scripture readings, and thoughtful reflections to help students connect ancient wisdom with contemporary life.';
    const tTwo = 'This comprehensive course covers the foundational principles of Christian theology, biblical interpretation, and church history. Designed for both newcomers and those seeking to deepen their faith, the curriculum explores the essential doctrines of Christianity, including the nature of God, the life and teachings of Jesus Christ, the work of the Holy Spirit, and the historical development of the church from its early beginnings to the present day. Each session includes scripture readings, theological reflections, and practical applications for everyday life.';
    const tThree = 'This course provides an in-depth exploration of the Bible, church history, and Christian doctrine. We will study the Old and New Testaments, examining key figures, events, and themes that shape the Christian faith. Topics include the creation narrative, the patriarchs, the exodus, the prophets, the life and ministry of Jesus, the apostolic age, and the early church fathers. We will also examine the development of Christian theology, including the Trinity, Christology, soteriology, and eschatology. Each lesson is designed to help students understand the historical and theological context of scripture and apply its teachings to contemporary life. Through lectures, group discussions, and personal reflection, participants will grow in their knowledge and understanding of the Christian faith.';
    const tFour = 'Students will engage with primary sources, participate in critical discussions, and develop a deeper appreciation for the richness and complexity of Christian tradition. This course is ideal for anyone seeking a more comprehensive understanding of Christian theology, whether for personal growth, ministry preparation, or academic study.';
    const tFive = 'This course provides a practical introduction to ministry leadership and Christian service in the local church and wider community. Topics include preaching and teaching, pastoral care, evangelism, discipleship, and church administration. We will explore biblical models of leadership and consider how they apply to contemporary ministry contexts, including small groups, youth ministry, and missions. In addition, we will address the personal and spiritual disciplines needed for effective ministry, such as prayer, Bible study, and spiritual formation. Through case studies, practical exercises, and real-world examples, participants will develop the skills and confidence needed to serve faithfully in their local church and community.';
    
    const tArray = [tOne, tTwo, tThree, tFour, tFive];

    function nextText() {
        const currentIndex = tArray.indexOf(text);
        const nextIndex = (currentIndex + 1) % tArray.length;
        setText(tArray[nextIndex]);
        if(nextIndex === -1) {
            setText(tArray[0]);
        }
    }

    function beforeText() {
        const currentIndex = tArray.indexOf(text);
        const nextIndex = (currentIndex - 1) % tArray.length;
        setText(tArray[nextIndex]);
        if(nextIndex === -1) {
            setText(tArray[tArray.length - 1]);
        }
    }
    
    const [text, setText] = useState('');
    
    return(
        <div className="flex flex-col w-1/4 min-h-32">
            <p>{text}</p>
            <button onClick={nextText}>Next</button>
            <button onClick={beforeText}>Before</button>
        </div>
    )
}

export default TextHolder;