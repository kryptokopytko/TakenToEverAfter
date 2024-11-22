import os
import re

def remove_comments_from_file(file_path):
    single_line_comment = r'//.*?$' 
    mmulti_line_comment = r'{/\*.*?\*/}'     
            
    multi_line_comment = r'/\*.*?\*/'     
    
    pattern = re.compile(f'({single_line_comment}|{mmulti_line_comment}|{multi_line_comment})', re.MULTILINE | re.DOTALL)

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        cleaned_content = pattern.sub('', content)

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(cleaned_content)

        print(f"Zaktualizowano plik: {file_path}")

    except Exception as e:
        print(f"Nie można przetworzyć pliku {file_path}: {e}")

def list_files_in_directory(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        
        for file in files:
            if file.endswith(('.tsx', '.ts')) and not file.endswith(('dummyData.ts')) and not  file.endswith(('PhotosPage.tsx')):
                remove_comments_from_file(os.path.join(root, file))

current_directory = os.getcwd() 
list_files_in_directory(current_directory)
