from bs4 import BeautifulSoup
import requests
from SimplerApp.models import Quote

def first_alpha_toupper(string):
	name_arr = list(string)
	name_arr[0]=name_arr[0].upper()
	return ''.join(name_arr)

def format_author(author):
	author_first = author.split('_')[0]
	author_last = author.split('_')[1]
	return first_alpha_toupper(author_first)+' '+first_alpha_toupper(author_last)

def getQuotes(author):
	initial = list(author)[0]
	author_formatted = format_author(author)
	url = 'http://www.brainyquote.com/quotes/authors/'+initial+'/'+author+'.html'
	r = requests.get(url)
	soup = BeautifulSoup(r.text)
	html = str(soup)
	qtotal = len(html.split('bqQuoteLink">'))
	unfiltered_quote_arr = html.split('bqQuoteLink">')
	del unfiltered_quote_arr[0]
	del unfiltered_quote_arr[(qtotal-2)]
	for i in unfiltered_quote_arr:
		quote = i.split('>')[1].replace('</a','')
		q = Quote.objects.get_or_create(quote=quote, author=author_formatted)[0]

