import os
from PIL import Image

gallery_path = r"c:\Users\Admin\Desktop\HackJKLU V5.0\HackJKLU-v5.0\src\assets\gallery"
max_dimension = 1920
quality = 85 

print(f"Compressing images in {gallery_path}...")

total_saved = 0

for root, dirs, files in os.walk(gallery_path):
    for filename in files:
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            filepath = os.path.join(root, filename)
            try:
                original_size = os.path.getsize(filepath)
                
                with Image.open(filepath) as img:                         
                    width, height = img.size
                    if width > max_dimension or height > max_dimension:
                        if width > height:
                            new_width = max_dimension
                            new_height = int(height * (max_dimension / width))
                        else:
                            new_height = max_dimension
                            new_width = int(width * (max_dimension / height))
                        
                        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    
                    
                    if img.mode in ('RGBA', 'P'): 
                        img = img.convert('RGBA') 
                    
                   
                    new_filepath = os.path.splitext(filepath)[0] + '.webp'
                    img.save(new_filepath, "WEBP", quality=quality, optimize=True)
                    
                    new_size = os.path.getsize(new_filepath)
                    saved = original_size - new_size
                    total_saved += saved
                    
                    print(f"Compressed {filename}: {original_size/1024:.2f}KB -> {new_size/1024:.2f}KB (Saved {saved/1024:.2f}KB)")
                    
             
                    if filepath != new_filepath:
                         os.remove(filepath)

            except Exception as e:
                print(f"Error processing {filename}: {e}")

print(f"Compression complete. Total space saved: {total_saved / (1024*1024):.2f} MB")
