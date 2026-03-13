import json
import os
import shutil

def cleanup_titles(input_path):
    print(f"Loading {input_path}...")
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    modified_count = 0
    
    for book in data.get('books', []):
        for chapter in book.get('chapters', []):
            last_title = None
            for verse in chapter.get('verses', []):
                current_title = verse.get('title')
                
                if current_title:
                    if current_title == last_title:
                        # Duplicate title found, remove it
                        del verse['title']
                        modified_count += 1
                    else:
                        # New title, keep it as reference
                        last_title = current_title
                # Note: We keep last_title even if current verse has no title
                # to handle gaps in title application if needed, 
                # but the current logic is strictly consecutive.

    print(f"Removed {modified_count} duplicate titles.")
    
    backup_path = input_path + ".bak"
    print(f"Creating backup at {backup_path}...")
    shutil.copy2(input_path, backup_path)
        
    print(f"Saving changes to {input_path}...")
    with open(input_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("Done.")

if __name__ == "__main__":
    path = "/home/sophie/Documents/baibly json/baiboly.json"
    cleanup_titles(path)
