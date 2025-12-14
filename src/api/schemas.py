from pydantic import BaseModel

class EmailRequest(BaseModel):
    email_text: str

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
