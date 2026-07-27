import json

def check_text_compliance(text, wordlist_path):
    with open(wordlist_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    found = []
    for word in data['forbidden_words']:
        if word in text:
            found.append(word)
    return found
