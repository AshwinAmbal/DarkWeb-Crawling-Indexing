import os
from html.parser import HTMLParser
import xml.etree.Elementtree as ET

# parser class to handle html data
class MyHTMLParser(HTMLParser):
    def handle_starttag('title', ):
        # find start tags that contain titles
        # store in xml
        #titles.text = #titles
    
    def handle_data(self, data):
        # search for keywords given in array or most common words
        # store in xml
        # keywords.text = #keyword
        
# get directory containing files to be parsed from user
directory_name = input("Enter directory to be parsed: ")

directory = os.fsencode(directory_name)

parser = MyHTMLParser()

# traverse directory 
for root, dirs, files in os.walk(directory):
    for file in files:
        #for line in file:
         #   print line
            
        # create new xml for each file
        webpage = ET.Element('webpage')
        type = ET.SubElement(webpage, 'type')
        titles = ET.SubElement(webpage, 'titles')
        keywords = ET.SubElement(webpage, 'keywords')      
        # feed the file to the parser
        parser.feed(file)


