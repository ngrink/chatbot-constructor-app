import re
import nltk
import razdel
import pymorphy2
import natasha
#import NamesExtractor, MorphVocab, DatesExtractor, MoneyExtractor, AddrExtractor


morph = pymorphy2.MorphAnalyzer()
stopwords = nltk.corpus.stopwords.words("russian")
stopwords = set(stopwords) - set(("да", "не", "нет", "хорошо", "когда", "какой", "другой"))



class Preprocessor:
    @staticmethod
    def processAll(corpus: list, split_sentences=False):
        corpus_tkn = []
        for doc in corpus:
            corpus_tkn.append(Preprocessor.process(doc, split_sentences))

        return corpus_tkn

    @staticmethod
    def process(doc: str, split_sentences=False):
        if not split_sentences:
            tokens = Preprocessor._process(doc)
            return tokens
        else:
            sentences_tkn = [Preprocessor._process(s) for s in Preprocessor._sentenize(doc)]
            return sentences_tkn

    def _process(doc: str):
        tokens = Preprocessor._tokenize(doc)
        tokens = Preprocessor._sanitize(tokens)
        tokens = Preprocessor._lemmatize(tokens)
        tokens = Preprocessor._stopwords(tokens)
        return tokens

    def _sentenize(doc: str):
        sentences = [sent.text for sent in razdel.sentenize(doc)]
        return sentences

    def _tokenize(doc: str):
        tokens = [token.text for token in razdel.tokenize(doc)]
        return tokens

    def _sanitize(tokens: list):
        sanitized = []

        for token in tokens:
            token = token.lower()
            token = re.sub(r"[^а-яё.-]", "", token)
            token = token.strip("-")
            if token and not re.match(r"^(\.)+$", token):
                sanitized.append(token)

        return sanitized

    def _lemmatize(tokens: list):
        lemmatized = [morph.parse(token)[0].normal_form for token in tokens]
        return lemmatized

    def _stopwords(tokens: list):
        # removed = [token for token in tokens if len(token) > 1 and token not in stopwords]
        removed = tokens
        return removed


    # TODO: Transform specific named entities into their class
    # =========================================================
    # numbers to @NUM (1,2,3,..., one, two, three,...)
    # persons to @PERSON
    # usernames to @USERNAME
    # phone to @PHONE_NUMBER
    # links to @URL
    # addresses to @ADDRESS
    # cities to @CITY
    # organizations to @ORGANIZATION


if __name__ == "__main__":
    normaltext = """
        Наше дело не так однозначно, как-то может показаться: высокотехнологичная концепция общественного уклада где-то в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач на 100%!!! Вопрос с восклицанием, да?! Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта создаёт необходимость включения в производственный план восьми внеочередных мероприятий с учётом комплекса тридцати инновационных методов управления процессами... Равным образом, консультация с её широким активом выявляет срочную потребность новых принципов формирования материально-технической и т.д. Поэтому было решено выделить средства и т.д., и т.п. Самым ранним утром, т.е. около пяти часов, я уже проснулась и была готова отвечать на звонки.
    """
    intenttext = """
        Сколько у меня денег на счету?? Хочу сделать перевод Алексею. Где вы находитесь? Режим работы. До скольки вы работаете? Хочу сделать заказ. Хочу узнать статус заказа. Как мне сделать заказ? Как узнать информацию об объекте. Заведи будильник на 5 утра. Переведи Лере 500 рублей. Положи на телефон 100 рублей. Вчера заработал 5 тысяч руб. На 100% уверен что это было не так. Позвони Бабушке. Поставь напоминание на 7:00 вечера сделать уборку. Дмитрий, расскажите про условия возврата. Как мне записаться на прием. Есть свободное время вечером? Привет, чат-бот. Что нового? Вчера видел вашу статью, как мне получить скидку? 13 сентября день программиста. Мне не подошел товар, хочу вернуть. Я знаю. Я не знаю. Купить товар. Купить билеты. Оплатить товар. Оплатить билеты на сентябрь. Узнать статус заказа. Узнать расписание. Записаться на прием. Забронировать билеты. Забронировать столик. Связаться с человеком. Хочу поговорить с человеком. Перенаправьте на человека. Соедините с человеком. Переведите на человека. Соедините с оператором. Перенаправьте на оператора. Не знаю. Не уверен. Даже не знаю. Не думал об этом. Ну, не знаю. Встретимся на бульваре Будапештсткая, 72. Адрес доставки 650034, Новосибирская область, город Мытищи, пр. Гоголя, 15. Мой домашний адрес 760551, Орловская область, город Щёлково, наб. Космонавтов, 25. Как там погода в Москве? Что нового в Питере?
    """

    # doc = Preprocessor.process(intenttext, split_sentences=True)
    # corpus = Preprocessor.processAll([normaltext, intenttext])
    # print(doc)
    # print('-'*100)
    # print(corpus)

    # Preprocessor._ner_subaddr(intenttext) # Addresses
    # Preprocessor._ner_subnames(intenttext) # Names
    # Preprocessor._ner_subdates(intenttext) # Dates
    # Preprocessor._ner_submoney(intenttext) # Money
    # Preprocessor._ner_suburl(intenttext) # URL
    # Preprocessor._ner_subnumbers(intenttext) # Numbers
