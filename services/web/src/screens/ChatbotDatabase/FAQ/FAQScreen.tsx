import { FC, useState, ChangeEvent, Dispatch, SetStateAction} from "react";
import { observer } from "mobx-react-lite";
import { v1 as uuidv1 } from "uuid";
import useAsync from "react-hook-use-async";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useStore } from "@hooks/useStore";
import { FaqService } from "@services/config/faq.service";
import { IFaq, ISynonym, IAnswer } from "@ts/config/faq.types";
import styles from "./FAQScreen.module.scss";


const FAQScreen: FC = observer(() => {
    const { ConfigStore, FaqStore } = useStore();
    const configId = ConfigStore.configId as string;

    const faqs = useAsync(async () => {
        const data = await FaqService.getAllFaqs(configId)
        if (data) {
            FaqStore.setFaqs(data);
        }
        return data;
    })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [id, setId] = useState("");
    const [question, setQuestion] = useState("");
    const [synonyms, setSynonyms] = useState<ISynonym[]>([]);
    const [answers, setAnswers] = useState<IAnswer[]>([]);

    const openCreateModal = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
        setQuestion("");
        setSynonyms([]);
        setAnswers([answerCreator()]);
    };

    const openEditModal = (faqId: string, faq: IFaq) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setId(faqId);
        setQuestion(faq.question);
        setSynonyms(faq.synonyms);
        setAnswers(faq.answers);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const synonymCreator = (): ISynonym => {
        return {id: Date.now().toString(), value: ""}
    }

    const answerCreator = (): IAnswer => {
        return {id: Date.now().toString(), value: ""}
    }

    const addSynonymField = () => {
        setSynonyms([...synonyms, synonymCreator()])
    }

    const addAnswerField = () => {
        setAnswers([...answers, answerCreator()])
    }

    const onItemChange = (
        collection: ISynonym[] | IAnswer[],
        setCollection: Dispatch<SetStateAction<ISynonym[] | IAnswer[]>>,
        id: string
    ) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setCollection(collection.map(item => {
                return item.id === id
                    ? {...item, value: e.target.value}
                    : item
            }))
    }}

    const handleCreateFaq = () => {
        const uid = uuidv1();
        FaqStore.createFaq(uid, {question, synonyms, answers});
        FaqService.addFaq(configId, uid, {question, synonyms, answers});
        setIsModalOpen(false);
    }

    const handleUpdateFaq = () => {
        FaqStore.updateFaq(id, {question, synonyms, answers});
        FaqService.updateFaq(configId, id, {question, synonyms, answers});
        setIsModalOpen(false);
    }

    const handleDeleteFaq = (id: string) => {
        FaqStore.deleteFaq(id);
        FaqService.deleteFaq(configId, id);
    }

    return (
        <div className={styles.screen}>
            <div className={styles.wrapper}>
                <div className="row ai-center">
                    <h1 className={styles.heading}>FAQ</h1>
                    <Button className={styles.btnAdd} onClick={openCreateModal}>Добавить запись +</Button>
                </div>

                {faqs.result && <div className={styles.faqs}>
                    <ul className={styles.faqsList}>

                        {Object.entries(FaqStore.faqs).map(([id, {question, synonyms, answers}]) => (
                            <li
                                key={id}
                                className={styles.faqsItem}
                                onClick={() => openEditModal(id, {question, synonyms, answers})}
                            >
                                <div className={styles.faqsQuestion}>
                                    <div className={styles.faqsQuestionTitle}>
                                        {question}
                                    </div>
                                    {!!synonyms.length &&
                                        <div className={styles.faqsQuestionCount}>
                                            {`+${synonyms.length}`}
                                        </div>
                                    }
                                </div>
                                <div className={styles.faqsAnswer}>
                                    <div className={styles.faqsAnswerTitle}>
                                        {answers[0].value}
                                    </div>
                                    {!!(answers.length - 1) &&
                                        <div className={styles.faqsAnswerCount}>
                                            {`+${answers.length - 1}`}
                                        </div>
                                    }
                                </div>
                                <div
                                    className={styles.faqsDeleteIcon}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFaq(id);
                                    }}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>}

                <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {isEditMode
                            ? "Обновить запись"
                            : "Добавить запись"
                        }
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                            Вопрос
                        </Typography>
                        <TextField
                            margin="dense"
                            type="text"
                            variant="outlined"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            fullWidth
                            autoFocus
                        />
                        <Typography variant="subtitle1" sx={{fontWeight: "bold", mt: 1.5, mb: 1}}>
                            Синонимы вопроса
                        </Typography>
                        <ul>
                            {synonyms.map(({id, value}) => (
                                <li key={id}>
                                    <OutlinedInput
                                        sx={{my: 0.5, pr: 2.5}}
                                        margin="dense"
                                        type="text"
                                        value={value}
                                        onChange={onItemChange(synonyms, setSynonyms, id)}
                                        fullWidth
                                        autoFocus
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="remove item"
                                                onClick={() => setSynonyms(synonyms.filter(item => item.id !== id))}
                                                edge="end"
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant="outlined"
                            startIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                            sx={{justifyContent: 'flex-start', px: 2.5, py: 1.5}}
                            onClick={addSynonymField}
                            fullWidth
                        >
                            Добавить синоним вопроса
                        </Button>
                        <Typography variant="subtitle1" sx={{fontWeight: "bold", mt: 2}}>
                            Ответы
                        </Typography>
                        <ul>
                            {answers.map(({id, value}) => (
                                <li key={id}>
                                    <OutlinedInput
                                        sx={{my: 0.5, pr: 2.5}}
                                        margin="dense"
                                        type="text"
                                        value={value}
                                        onChange={onItemChange(answers, setAnswers, id)}
                                        fullWidth
                                        autoFocus
                                        endAdornment={answers.length > 1 &&
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="remove item"
                                                    onClick={() => setAnswers(answers.filter(item => item.id !== id))}
                                                    edge="end"
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant="outlined"
                            startIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                            sx={{justifyContent: 'flex-start', px: 2.5, py: 1.5}}
                            onClick={addAnswerField}
                            fullWidth
                        >
                            Добавить вариант ответа
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Отмена</Button>
                        {isEditMode
                            ? <Button onClick={handleUpdateFaq}>Обновить</Button>
                            : <Button onClick={handleCreateFaq}>Добавить</Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
})

export { FAQScreen };
