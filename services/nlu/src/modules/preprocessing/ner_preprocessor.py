import natasha


morph_vocab = natasha.MorphVocab()


class NERPreprocessor:
    @staticmethod
    def process(text: str):
        return text
        # nertokens = [token for token in tokens if len(token) > 1 and token not in stopwords]
        # return nertokens

    def _subaddr(text: str):
        extractor = natasha.AddrExtractor(morph_vocab)
        matches = extractor(text)
        print(*matches, sep="\n")

        return text

    def _subnames(text: str):
        extractor = natasha.NamesExtractor(morph_vocab)
        matches = extractor(text)
        print(*matches, sep="\n")

        return text

    def _subdates(text: str):
        extractor = natasha.DatesExtractor(morph_vocab)
        matches = extractor(text)
        print(*matches, sep="\n")

        return text

    def _submoney(text: str):
        extractor = natasha.MoneyExtractor(morph_vocab)
        matches = extractor(text)
        print(*matches, sep="\n")

        return text
