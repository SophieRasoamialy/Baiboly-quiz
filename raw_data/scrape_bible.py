import urllib.request
import urllib.parse
import json
import re
import time
import html

# Base URL for the website
BASE_URL = "https://nybaiboly.net/"
# Main page containing the list of books
MAIN_PAGE = "Bible.htm"

def get_html(url):
    """Fetches HTML content using urllib."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = response.read()
            try:
                return data.decode('utf-8')
            except UnicodeDecodeError:
                return data.decode('windows-1252', errors='replace')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def parse_book(book_url, book_name):
    """Parses a single book's HTML for chapters and verses."""
    print(f"Processing {book_name}...", end=" ", flush=True)
    raw_html = get_html(book_url)
    if not raw_html:
        print("Failed to fetch.")
        return []

    # PRE-CLEANING: Remove parts that contain navigation or confusing headers
    # Remove navigation bar if present
    h = re.sub(r'<p class=["\']?(AccesDirect|Livre)["\']?>.*?</p>', '', raw_html, flags=re.DOTALL | re.IGNORECASE)
    # Remove "LIVRE X" headers
    h = re.sub(r'<p class=["\']?Clustersuprieur["\']?>.*?</p>', '', h, flags=re.DOTALL | re.IGNORECASE)
    
    chapters = []
    
    # Extract sections based on "Chapitre X" or "PSAUME X"
    chapter_parts = re.split(r'(?:Chapitre|PSAUME)\s+(\d+)', h, flags=re.IGNORECASE)
    
    if len(chapter_parts) > 1:
        for i in range(1, len(chapter_parts), 2):
            chapter_num = int(chapter_parts[i])
            chapter_content = chapter_parts[i+1]
            verses = extract_verses_with_all_titles(chapter_content)
            if verses:
                chapters.append({"chapter": chapter_num, "verses": verses})
    else:
        # Handle books with only one chapter
        verses = extract_verses_with_all_titles(h)
        if verses:
            chapters.append({"chapter": 1, "verses": verses})

    print(f"Done ({len(chapters)} chapters).")
    return chapters

def extract_verses_with_all_titles(html_content):
    """Extracts verses and captures ALL green spans and bracketed titles."""
    # 1. Identify and mark green spans
    def mark_titles(match):
        inner = match.group(2)
        inner_clean = re.sub(r'<[^>]+>', ' ', inner).strip()
        return f" |||TITLE:{inner_clean}||| "

    # Target any span with color:green in its style
    marked = re.sub(r"<span([^>]*style=[^>]*color:green[^>]*)>(.*?)</span>", mark_titles, html_content, flags=re.IGNORECASE | re.DOTALL)
    
    # 2. Decode entities and strip all HTML tags
    content = html.unescape(marked)
    clean = re.sub(r'<[^>]+>', ' ', content)
    # Normalize whitespace
    clean = re.sub(r'\s+', ' ', clean).strip()
    
    verses = []
    # Pattern to find verse markers: some space (or start), then digit(s), then space
    verse_markers = list(re.finditer(r'(?:^|\s)(\d+)\s+', clean))
    
    for j in range(len(verse_markers)):
        start_match = verse_markers[j]
        v_num = int(start_match.group(1))
        
        start_pos = start_match.end()
        end_pos = verse_markers[j+1].start() if j + 1 < len(verse_markers) else len(clean)
        
        v_raw = clean[start_pos:end_pos].strip()
        
        titles = []
        # Case A: |||TITLE:Content||| markers
        for t in re.findall(r"\|\|\|TITLE:(.*?)\|\|\|", v_raw):
            titles.append(t)
            
        # Case B: Pre-text titles
        search_start = verse_markers[j-1].end() if j > 0 else 0
        pre_text = clean[search_start:start_match.start()].strip()
        for pt in re.findall(r"\|\|\|TITLE:(.*?)\|\|\|", pre_text):
             titles.append(pt)
        
        # Clean markers from text
        v_text = re.sub(r"\|\|\|TITLE:.*?\|\|\|", "", v_raw).strip()
        
        # Case C: Bracketed text at the start
        bracket_match = re.search(r"^\[([^\]\.]+)(?:\]|\.|$)", v_text)
        if bracket_match:
            titles.append(bracket_match.group(1).strip())
            if len(bracket_match.group(1)) < 200:
                v_text = v_text[bracket_match.end():].strip()
            
        # Deduplicate and clean titles
        cleaned_titles = []
        seen_titles = set()
        for t in titles:
            t = t.strip(" []")
            if t and t not in seen_titles:
                seen_titles.add(t)
                cleaned_titles.append(t)
        
        if v_text and len(v_text) > 2:
            if not any(x in v_text for x in ["Copyright", "www.", "Direct"]):
                verse_obj = {"verse": v_num, "text": v_text}
                if cleaned_titles:
                    verse_obj["title"] = " ".join([f"[{t}]" for t in cleaned_titles])
                verses.append(verse_obj)
                
    return verses

def main():
    print("Starting robust extraction with Psaumes support...")
    main_html = get_html(BASE_URL + MAIN_PAGE)
    if not main_html:
        print("Failed to load main page.")
        return

    bible_data = {
        "metadata": {
            "source": "https://nybaiboly.net/Bible.htm",
            "language": "Malagasy",
            "with_titles": True,
            "robust_extraction": True,
            "extracted_at": time.strftime("%Y-%m-%d %H:%M:%S")
        },
        "books": []
    }

    book_links = re.findall(r'<a\s+href="([^"]*BibleMalagasyHtm-[^"]+\.htm)">([^<]+)</a>', main_html, re.IGNORECASE)
    
    seen_hrefs = set()
    unique_links = []
    for href, name in book_links:
        if href not in seen_hrefs:
            seen_hrefs.add(href)
            unique_links.append((href, name))

    print(f"Found {len(unique_links)} potential book links.")

    for href, name in unique_links:
        book_url = urllib.parse.urljoin(BASE_URL, href)
        book_name = name.strip()
        
        if "Bible.htm" in href or "Index" in href:
            continue
            
        chapters = parse_book(book_url, book_name)
        if chapters:
            bible_data["books"].append({
                "name": book_name,
                "chapters": chapters
            })
        
        time.sleep(0.1) # Slightly more delay for stability

    output_path = '/home/sophie/Documents/baibly json/baiboly.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(bible_data, f, ensure_ascii=False, indent=2)

    print(f"\nExtraction complete! Saved {len(bible_data['books'])} books to {output_path}")

if __name__ == "__main__":
    main()
