interface IFaqs {
    [id: string]: IFaq
}

interface IFaq {
    question: string,
    synonyms: ISynonym[],
    answers: IAnswer[]
    disabled?: boolean
}

interface ISynonym {
    id: string,
    value: string
}

interface IAnswer {
    id: string,
    value: string
}

export type {
    IFaqs,
    IFaq,
    ISynonym,
    IAnswer
}
