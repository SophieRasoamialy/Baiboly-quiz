import urllib.request
import json
import re
import html

# Test with Genesis
url = "https://nybaiboly.net/Bible/BibleMalagasyHtm-at01-Genese.htm"

def get_html(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = response.read()
        try:
            return data.decode('utf-8')
        except UnicodeDecodeError:
            return data.decode('windows-1252', errors='replace')

raw_html = get_html(url)
chapter_parts = re.split(r'Chapitre\s+(\d+)', raw_html, flags=re.IGNORECASE)

print(f"Total parts: {len(chapter_parts)}")

def extract_verses_with_titles(html_content):
    content = html.unescape(html_content)
    # Strip ALL tags but keep content
    clean = re.sub(r'<[^>]+>', ' ', content)
    clean = re.sub(r'\s+', ' ', clean).strip()
    
    print(f"Cleaned content snippet: {clean[:200]}")
    
    verse_markers = list(re.finditer(r'(?:^|\s)(\d+)\s+', clean))
    print(f"Found {len(verse_markers)} verse markers.")
    
    verses = []
    for j in range(len(verse_markers)):
        start_match = verse_markers[j]
        v_num = int(start_match.group(1))
        start_pos = start_match.end()
        end_pos = verse_markers[j+1].start() if j + 1 < len(verse_markers) else len(clean)
        
        v_raw = clean[start_pos:end_pos].strip()
        
        title = None
        # Check for title in brackets
        title_match = re.search(r'\[([^\]]+)\]', v_raw)
        if title_match and (v_raw.startswith(title_match.group(0)) or v_raw.startswith(' ' + title_match.group(0))):
            title = title_match.group(1).strip()
            v_text = v_raw.replace(title_match.group(0), '').strip()
        else:
            v_text = v_raw
            
        if v_text and len(v_text) > 2:
            verses.append({"verse": v_num, "text": v_text, "title": title})
    return verses

if len(chapter_parts) > 1:
    chapter_num = int(chapter_parts[1])
    chapter_content = chapter_parts[2]
    verses = extract_verses_with_titles(chapter_content)
    print(f"Chapter {chapter_num}: {len(verses)} verses")
    if verses:
        print(f"First verse: {verses[0]}")
