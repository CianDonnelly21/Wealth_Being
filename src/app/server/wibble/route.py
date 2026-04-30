import os
from groq import Groq
from fastapi import APIRouter, Depends
from dotenv import load_dotenv
from auth.deps import require_user


load_dotenv('dbConnect.env')

router = APIRouter()

# sanitize messages to prevent token waste or bad requests
def _sanitize_messages(messages):
    sanitized = []

    for message in messages:
        role = message.get('role', '')
        text = message.get('text', '').strip() # strip any leading or trailing whitespace to prevent token waste

        # skip messages with empty role or text
        if role not in {'user', 'assistant'} or not text:
            continue

        sanitized.append({'role': role, 'content': text}) # appends to format Groq expects

    return sanitized


# shorten messages to a maximum length to manage token usage
def _trim_message(text, limit=1000):
    if len(text) <= limit:
        return text

    return text[:limit].rstrip() + '...' # append '...' to indicate truncation


# convert messages to the format Groq expects
def _to_groq_messages(messages):
    # system instructions
    groq_messages = [
        {
            'role': 'system',
            'content': (
                'You are Wibble, a supportive wellness assistant. '
                'Give concise, calm, emotionally safe responses. '
                'Do not claim to be a therapist. '
                'If user shows signs of severe distress or self-harm intent, '
                'encourage contacting local emergency services or a trusted person immediately.'
            )
        }
    ]

    # only keep the last 6 messages in memory to reduce request size
    recent_messages = messages[-6:]

    for message in recent_messages:
        groq_messages.append({
            'role': message['role'],
            'content': _trim_message(message['content'])
        })

    return groq_messages


@router.post('/wibble/chat')
async def chat_with_wibble(payload: dict, session=Depends(require_user)):
    api_key = os.getenv('GROQ_API_KEY') # api key found in DBConnect.env
    if not api_key:
        return {'valid': False, 'error': 'GROQ_API_KEY is not configured'}

    # pull messages from POST payload and sanitize
    raw_messages = payload.get('messages', [])
    messages = _sanitize_messages(raw_messages)

    if not messages:
        return {'valid': False, 'error': 'At least one message is required'}

    client = Groq(api_key=api_key)

    try:
        model_name = 'llama-3.1-8b-instant' # AI model Groq is using
        completion = client.chat.completions.create(
            model=model_name,
            messages=_to_groq_messages(messages),  # type: ignore[arg-type]
            temperature=0.7, # controls randomness of AI response
            max_tokens=300, # limits the length of the response
        )

        reply = (completion.choices[0].message.content or '').strip() # strip any leading or trailing whitespace
        if not reply:
            return {'valid': False, 'error': 'Empty response from AI model'}

        return {'valid': True, 'reply': reply} # success response returned to client
    except Exception as error:
        return {'valid': False, 'error': str(error)} # error response returned to client
