import joblib

def test_model_load():
    model = joblib.load("models/email_spam_model.joblib")
    pred = model.predict(["win money now"])
    assert pred[0] in [0, 1]
