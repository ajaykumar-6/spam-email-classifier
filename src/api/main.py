import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load model
model = joblib.load("models/email_spam_model.joblib")

# FastAPI app
app = FastAPI(title="Email Spam Classifier")

# CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class EmailInput(BaseModel):
    email_text: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: EmailInput):
    prob = model.predict_proba([data.email_text])[0][1]
    prediction = "spam" if prob >= 0.5 else "not spam"

    return {
        "prediction": prediction,
        "probability": round(float(prob), 3)
    }
