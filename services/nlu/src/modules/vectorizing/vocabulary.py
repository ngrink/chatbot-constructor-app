from collections import Counter
from nltk import flatten


class Vocabulary:
    def __init__(self, corpus, maxlen=10000):
        self._counter = Counter(flatten(corpus))
        self._words = {}
        self._idxs = {}
        self.len = min(maxlen, len(self._counter.keys()))
        self.corpuslen = len(corpus)

        for idx, (word, freq) in enumerate(self._counter.most_common(self.len)):
            self._words[word] = idx
            self._idxs[idx] = word

    def word2idx(self, word):
        return self._words.get(word, None)

    def idx2word(self, idx):
        return self._idxs.get(idx, None)

    def wordcount(self, word):
        return self._counter.get(word) if word in self._words else 0

    def items(self):
        return [word for word in self._words]
