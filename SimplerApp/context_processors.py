#This file manages the global TEMPLATE_CONTEXT_PROCESSORS variables.

from models import Quote
import random

def quotes_processor(request):
	maxid = len(Quote.objects.all())
	qid = random.randint(1,maxid)
	quote = Quote.objects.get(id = qid)
	author = quote.author.split(' ')[1]
	return {'quote': quote, 'q_author':author}