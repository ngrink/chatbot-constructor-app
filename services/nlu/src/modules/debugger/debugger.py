import pandas as pd
import numpy as np

from ...nlu import NLU


class NLUDebugger:
    @staticmethod
    def print_train_data(model, score, corpus_test, X_test):
        doc = corpus_test[0]
        vector = np.array(X_test[0]).reshape(1, -1)
        prediction = model.predict(vector)
        prediction_proba = model.predict_proba(vector)

        print("Vector:\n", vector[0], end="\n\n")
        print("Doc:", doc)
        print(pd.DataFrame({
            "intent": model.classes_,
            "predition": prediction_proba[0]
        }))
        print("Prediction:",  prediction)
        print("Overall score:", score)

    @staticmethod
    def debug(
        chatbotId: int,
        intents: pd.DataFrame,
        entities: pd.DataFrame
    ):
        pass
