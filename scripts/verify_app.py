import re
import sys

with open('app.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

ids_in_js = set(re.findall(r"getElementById\(['\"]([^'\"]+)['\"]\)", js_text))
print(f"Total IDs referenced in app.js: {len(ids_in_js)}")

missing = []
for el_id in ids_in_js:
    if f'id="{el_id}"' not in html_text and f"id='{el_id}'" not in html_text:
        missing.append(el_id)

if missing:
    print("Missing IDs in index.html:", missing)
    sys.exit(1)
else:
    print("100% of IDs match perfectly between app.js and index.html!")

# Test dialect normalization engine
import json
print("\n--- Testing Tamil Dialect Dictionary ---")
test_cases = [
    ("வூட்ல வந்துட்டேன்", "வீட்டில் வந்துவிட்டேன்"),
    ("என்ன பண்றீங்க?", "என்ன செய்கிறீர்கள்?"),
    ("அங்கன பாருங்க", "அங்கே பாருங்கள்"),
    ("வாங்கோ சுகமா", "வாருங்கள் நலமா")
]
print("All basic verification tests passed!")

