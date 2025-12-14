import re
import string

def clean_email(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)  # remove URLs
    text = re.sub(r"\S+@\S+", "", text)  # remove emails
    text = re.sub(r"<.*?>", "", text)    # remove HTML
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\d+", "", text)
    return text.strip()
