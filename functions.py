from bs4 import BeautifulSoup
import requests
from SimplerApp.models import Quote
from django.core.urlresolvers import RegexURLResolver, RegexURLPattern, Resolver404, get_resolver

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

__all__ = ('resolve_to_name',)

def _pattern_resolve_to_name(self, path):
    match = self.regex.search(path)
    if match:
        name = ""
        if self.name:
            name = self.name
        elif hasattr(self, '_callback_str'):
            name = self._callback_str
        else:
            name = "%s.%s" % (self.callback.__module__, self.callback.func_name)
        return name

def _resolver_resolve_to_name(self, path):
    tried = []
    match = self.regex.search(path)
    if match:
        new_path = path[match.end():]
        for pattern in self.url_patterns:
            try:
                name = pattern.resolve_to_name(new_path)
            except Resolver404, e:
                tried.extend([(pattern.regex.pattern + '   ' + t) for t in e.args[0]['tried']])
            else:
                if name:
                    return name
                tried.append(pattern.regex.pattern)
        raise Resolver404, {'tried': tried, 'path': new_path}


# here goes monkeypatching
RegexURLPattern.resolve_to_name = _pattern_resolve_to_name
RegexURLResolver.resolve_to_name = _resolver_resolve_to_name


def resolve_to_name(path, urlconf=None):
    return get_resolver(urlconf).resolve_to_name(path)