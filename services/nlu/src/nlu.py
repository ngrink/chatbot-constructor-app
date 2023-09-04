import sys
import json
import math
import pandas as pd
import numpy as np
import tensorflow as tf
import matplotlib
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from tensorflow import keras

from modules.preprocessing.preprocessor import TextPreprocessor
from modules.vectorizing.vocabulary import Vocabulary
from modules.vectorizing.vectorizer import Vectorizer


np.set_printoptions(threshold=sys.maxsize)
pd.set_option('display.max_rows', 200)
matplotlib.use('TkAgg')


class NLU:
    def __init__(self, algorithm="GaussianNB"):
        self.algorithm = algorithm
        self.models = {}
        self.vectorizer = {}
        # intent_model = nlu.models[chatbotId]["intents"]
        # entity_model = nlu.models[chatbotId]["entities"]

    def prepare_data(
        self,
        chatbotId: int,
        intents: pd.DataFrame,
        entities: pd.DataFrame
    ):
        texts = intents["examples"]

        corpus = TextPreprocessor.processAll(texts)
        vocabulary = Vocabulary(corpus, maxlen=10000)
        vectorizer = Vectorizer(vocabulary)
        self.vectorizer[chatbotId] = vectorizer

        x = np.array(self.vectorizer[chatbotId].tfidf(corpus))
        y = intents["names"].values
        # y = pd.get_dummies(intents["names"]).values

        x_train, x_test, y_train, y_test, corpus_train, corpus_test = train_test_split(
            x, y, corpus, test_size=0.15, stratify=y
        )

        return x_train, x_test, y_train, y_test, corpus_train, corpus_test

    def train(
        self,
        chatbotId: int,
        intents: pd.DataFrame,
        entities: pd.DataFrame
    ):
        """
            Starts training models based on the configuration object

            The configuration object contains intents and entities.
            Saves intent model and the entity model under the chatbot identifier
        """



        model, score = self.train_GaussianNB(X_train, X_test, y_train, y_test)
        # model, score = self.train_LogisticRegression(X_train, X_test, y_train, y_test) # -
        # model, score = self.train_SVM(X_train, X_test, y_train, y_test) # --
        # model, score = self.train_Keras(
        #     X_train, X_test, y_train, y_test,
        #     vectorlen=vocabulary.len,
        #     classeslen=len(intents['names'].unique())
        # )

        return model, score

    def train_GaussianNB(self, X_train, X_test, y_train, y_test):
        nb = GaussianNB()
        model = nb.fit(X_train, y_train)
        score = model.score(X_test, y_test)

        return (model, score)

    def train_LogisticRegression(self, X_train, X_test, y_train, y_test):
        logreg = LogisticRegression()
        model = logreg.fit(X_train, y_train)
        score = model.score(X_test,y_test)

        return (model, score)

    def train_SVM(self, X_train, X_test, y_train, y_test):
        svm_ = svm.SVC(probability=True)
        model = svm_.fit(X_train, y_train)
        score = model.score(X_test, y_test)

        return (model, score)

    def train_Keras(self, X_train, X_test, y_train, y_test, **kwargs):
        model = tf.keras.Sequential()
        model.add(tf.keras.Input(shape=(kwargs["vectorlen"],)))
        model.add(tf.keras.layers.Dense(10))
        model.add(tf.keras.layers.Dense(kwargs["classeslen"], activation='softmax'))
        print(model.summary())

        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics = ['accuracy']
        )

        history = model.fit(
            X_train,
            y_train,
            batch_size=1,
            epochs=15,
            validation_split=0.2
        )

        plt.plot(history.history['loss'], label='training data')
        plt.plot(history.history['val_loss'], label='validation data')
        plt.ylabel('loss')
        plt.xlabel('epochs')
        plt.legend(loc="upper left")
        plt.show()

        (loss, accuracy) = model.evaluate(X_test, y_test, verbose=0)
        print("Loss:", loss)
        print("Accuracy:", accuracy)

        return (model, accuracy)


    def process(self, chatbotId, text):
        """
            Сlassifies intent and extracts entities from user text
        """
        pass



if __name__ == "__main__":
    def load_intents():
        data = json.load(open('./src/data/intents_lg.json', 'r'))
        df_intents = []
        df_examples = []

        for intent, intent_data in data.items():
            examples = intent_data.get('examples', [])
            examples_basic = intent_data.get('examples.basic', [])
            n = len(examples) + len(examples_basic)

            df_intents.extend([intent] * n)
            df_examples.extend(examples)
            df_examples.extend(examples_basic)

        df = pd.DataFrame({
            "names": df_intents,
            "examples": df_examples
        })

        return df

    intents = load_intents()
    nlu = NLU()
    nlu.train(20703574, intents, None)
