import json
def chunk_merchant_doc(text, chunk_size=300):
    chunks = []
    for i in range(0, len(text), chunk_size - 50):
        chunks.append(text[i:i+chunk_size])
    return chunks
