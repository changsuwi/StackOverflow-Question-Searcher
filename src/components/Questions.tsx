import { useCallback, useEffect, useState } from 'react';
import { RootState } from '../stores/store';
import { useSelector } from "react-redux";
import { Question, QuestionFromStackOverflow } from '../models/Question';
import axios from "axios";
import clsx from 'clsx';
import Spinner from './Spinner';


function Questions() {
    const {list: tagsList, selectedIndex} = useSelector((state: RootState) => state.tags);
    const [questions, setQuestions] = useState([] as Question[]);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(false);
    const currentTag = tagsList[selectedIndex] ? tagsList[selectedIndex].name : "";

    const handleScroll = () => {
        let wait = false;
        return function () {
            if(!wait) {
                const scrollTop = document.documentElement.scrollTop
                const scrollHeight = document.documentElement.scrollHeight
                const clientHeight = document.documentElement.clientHeight
    
                if (scrollTop + clientHeight >= scrollHeight) {
                    setPage(perPage => perPage + 1);
                    wait = true;
                    setTimeout(function () {   
                        wait = false;          
                    }, 500);
                }
            }
            
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll());
        return () => window.removeEventListener('scroll', handleScroll())
    }, [])

    useEffect(() => {
        if(currentTag.length > 0) {
            setPage(1);
            setQuestions([]);
            setShouldFetch(true);
        } else {
            setQuestions([]);
        }
    }, [currentTag])

    useEffect(() => {
        if(!shouldFetch) {
            setShouldFetch(true);
        }
    }, [page])

    const updateQuestions = useCallback(async() => {
        const fetchQuestions = async(tag: string) => {
            const res = await axios.get(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${encodeURIComponent(tag)}&page=${page}&pagesize=20&site=stackoverflow`);
            const questionsFromStackOverflow = res.data.items;
            
            return questionsFromStackOverflow.map((questionRaw: QuestionFromStackOverflow) => {
                return {
                    answerCount: questionRaw.answer_count,
                    score: questionRaw.score,
                    owner: {
                        image: questionRaw.owner.profile_image,
                        displayName: questionRaw.owner.display_name  
                    },
                    viewCount: questionRaw.view_count,
                    isAccepted: questionRaw.accepted_answer_id > 0,
                    link: questionRaw.link,
                    title: questionRaw.title
                }
            })
        }

        if(currentTag.length > 0) {
            const newQuestions = await fetchQuestions(currentTag);
            if(page > 1) {
                setQuestions(questions.concat(newQuestions));
            } else {
                setQuestions(newQuestions);
            }
        }
        setShouldFetch(false);        
    }, [page, currentTag, questions])

    useEffect(() => {
        if(shouldFetch) {
            updateQuestions();
        }
    }, [shouldFetch, updateQuestions])

    return (
        <div className="flex flex-col">
            {questions.map((question, idx) => {
                const {title, score, answerCount, link, viewCount, owner, isAccepted} = question
                return (
                    <div key={idx} className="my-4 pb-4 flex flex-col w-full border-b cursor-pointer" onClick={() => window.open(link, "_black")}>
                        <div className='mb-4 text-lg font-semibold'>
                            <p>{title}</p>
                        </div>
                        <div className='flex'>
                            <div className='flex flex-col mr-2 flex-grow'>
                                <span className="font-medium">Score</span>
                                <span className={clsx({"text-red-600": score < 0 }, "text-center max-w-[50px]")}>{score}</span>
                            </div>
                            <div className='flex flex-col mr-2 flex-grow'>
                                <span className="font-medium">Answers</span>
                                <span className={
                                    clsx({
                                        "border border-green-400": answerCount > 1 && !isAccepted,
                                        "bg-green-600": answerCount > 1 && isAccepted
                                    }, "max-w-[64px] px-2 text-center")
                                }>
                                    {answerCount}
                                </span>
                            </div>
                            <div className='flex flex-col mr-2 flex-grow'>
                                <span className="font-medium">Viewed</span>
                                <span className="text-center max-w-[64px]">{viewCount}</span>
                            </div>
                            <div className='flex flex-col items-center max-h-[60px] tablet:max-h-[150px]'>
                                <img src={owner.image} alt="user" className=" mb-4 rounded-full max-h-[60px] tablet:max-h-[150px]" loading='lazy' />
                                <span className="text-center max-w-[64px]">{owner.displayName}</span>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
            {shouldFetch && <div className='flex justify-center my-4'><Spinner /></div>}
        </div>
    );
}

export default Questions;
