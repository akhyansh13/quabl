from haystack import indexes
from SimplerApp.models import Simpler

class QuestionIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
 
    def get_model(self):
        return Simpler
 
    def index_queryset(self, using=None):
        return self.get_model().objects.all()
