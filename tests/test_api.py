from fastapi.testclient import TestClient
from src.api.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200

def test_predict():
    response = client.post("/predict", json={
        "email_text": "Congratulations you won a prize"
    })
    assert response.status_code == 200
    assert "prediction" in response.json()
