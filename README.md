# Email Spam Classification System

ML-based email spam detector using FastAPI and Docker.

## Run Locally
python src/ml/train.py
uvicorn src.api.main:app --reload

## Docker
docker build -t email-spam .
docker run -p 8000:8000 email-spam


Evaluation : 

(venv) PS C:\CDC_Training\DevopsEmailClassifier\email-spam-classifier> python -m src.ml.evaluate
Confusion Matrix:
[[16459    34]
 [    0 17171]]

Classification Report:
              precision    recall  f1-score   support

           0       1.00      1.00      1.00     16493
           1       1.00      1.00      1.00     17171

    accuracy                           1.00     33664
   macro avg       1.00      1.00      1.00     33664
weighted avg       1.00      1.00      1.00     33664
