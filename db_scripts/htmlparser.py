import sys
from bs4 import BeautifulSoup as bs
import datetime

src_filename = sys.argv[1]
src_f = open(src_filename, 'r+')

if sys.argv[2] != None:
	dest_filename = sys.argv[2]
	d = open(dest_filename, 'w')

html = src_f.read()

soup = bs(html)
string = ""

for i in soup.select('.wikitable td > a'):
	newSoup = bs(str(i))
	k = newSoup.string
	try:
		if k != None:
			newK = k.replace('"', '\'')
			print(str(k))
			json = "{\"title\": \"" + str(newK) + "\", \"titleLower\": \"" + str(newK).lower() + "\", \"description\": \"\", \"creationDate\": \"" + str(datetime.date.today()) + "\", \"category\": \"\", \"labels\": [], \"numberOfPosts\": 0, \"imageUrl\": \"\", \"isLocked\": \"false\", \"isLive\": \"true\"}\n"
			d.write(json)
	except:
		continue

src_f.close()
d.close()
