import csv
import urllib.request
import json
import re
import os

url = "https://docs.google.com/spreadsheets/d/1JO_U6hPdkmzG1-qAkaodbwnP45dOpr8P3NkWB_YNoYQ/export?format=csv"
response = urllib.request.urlopen(url)
lines = [l.decode('utf-8') for l in response.readlines()]
reader = csv.reader(lines)

data = {}
current_committee = None

for row in reader:
    if not row: continue
    
    # Check if this row is a committee header row
    # e.g. "Organising Head,,,,,,"
    if row[0] and len(row) > 1 and row[1] == '' and row[2] == '':
        current_committee = row[0].strip()
        # Clean current_committee
        # some headers have trailing commas but the row[0] should be just the string
        data[current_committee] = {"core": [], "coordinators": [], "volunteers": []}
        continue
    
    try:
        float(row[0]) # check if row[0] is a number to find data rows
    except ValueError:
        continue
        
    name = row[1].strip()
    # Handle missing role column gracefully
    role_raw = row[5].strip().lower() if len(row) > 5 else ""
    
    if not current_committee or not name:
        continue
        
    if "core" in role_raw or "organising head" in role_raw or "secretary" in role_raw:
        data[current_committee]["core"].append(name)
    elif "coordinator" in role_raw:
        data[current_committee]["coordinators"].append(name)
    elif "volunteer" in role_raw:
        data[current_committee]["volunteers"].append(name)
    else:
        # Default fallback
        data[current_committee]["volunteers"].append(name)

# Normalize the mapped committee names for matching in page.tsx
# "Registration" -> "Registrations"
normalized_data = {}
for k, v in data.items():
    if k == "Registration": k = "Registrations"
    if k == "Tech and Support": k = "Tech Team" # page.tsx uses Tech Team
    if k == "Design": k = "Design Team"
    if k == "Sponsorship": k = "Sponsorships"
    if k == "Media and Report": k = "Media & Report"
    if k == "Internal Arrangement": k = "IA"
    if k == "Prize and Certificate": k = "P&C"
    if k == "Stage and Venue": k = "Stage & Venue"
    if k == "Problem Statement": k = "PS"
    
    normalized_data[k] = v

output_path = r"d:\hackjklu_v5.0\HackJKLU-v5.0\src\data\committeeData.ts"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w", encoding='utf-8') as f:
    f.write("export const COMMITTEE_DATA: Record<string, { core: string[], coordinators: string[], volunteers: string[] }> = ")
    f.write(json.dumps(normalized_data, indent=4))
    f.write(";\n")

print(f"Generated {output_path} successfully!")
