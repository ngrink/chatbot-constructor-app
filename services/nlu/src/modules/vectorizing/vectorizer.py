import math
from collections import Counter
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from .vocabulary import Vocabulary


countVectorizer = CountVectorizer(
    analyzer = "word",
    lowercase = True,
    tokenizer = None,
    preprocessor = None,
    stop_words = None,
    max_features = 5000
)

tfidfVectorizer = TfidfVectorizer(
    analyzer = "word",
    lowercase = False,
    tokenizer = None,
    preprocessor = None,
    stop_words = None,
    max_features = 10000
)


class Vectorizer:
    def __init__(self, vocabulary: Vocabulary):
        self.vocabulary = vocabulary

    def onehot(self, doc):
        indexes = []
        for word in doc:
            idx = self.vocabulary.word2idx(word)
            if idx:
                indexes.append(idx)

        maxlen = self.vocabulary.len
        onehot = np.eye(maxlen)[indexes]
        return onehot

    def bow(self, corpus):
        vectors = []

        for doc in corpus:
            vector = np.zeros(self.vocabulary.len)
            for token in doc:
                idx = self.vocabulary.word2idx(token)
                if idx:
                    vector[idx] += 1
            vectors.append(vector)

        return vectors

    def tfidf(self, corpus):
        vectors = []
        vectorlen = self.vocabulary.len
        corpuslen = self.vocabulary.corpuslen

        for doc in corpus:
            counter = Counter(doc)
            vector = np.zeros(vectorlen)
            N = len(doc)

            for token in set(doc):
                if token == "не":
                    pass
                idx = self.vocabulary.word2idx(token)
                wordcount = self.vocabulary.wordcount(token)
                if idx is not None:
                    tf = counter.get(token, 0)/N
                    idf = abs(math.log(wordcount/corpuslen))
                    tfidf = tf * idf
                    vector[idx] = tfidf
            vectors.append(vector)

        return vectors


#TODO: Add N-grams
