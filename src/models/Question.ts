export interface QuestionOwner {
    image: string,
    displayName: string
}

export interface Question {
    answerCount: number,
    score: number,
    owner: QuestionOwner,
    viewCount: number,
    isAccepted: boolean,
    link: string,
    title: string
}

interface OwnerFromStackOverflow {
    profile_image: string,
    display_name: string
}

export interface QuestionFromStackOverflow { 
    answer_count: number;
    score: number;
    owner: OwnerFromStackOverflow;
    view_count: number;
    accepted_answer_id: number;
    link: string;
    title: string 
}
