from django.db import models
import os

class ImageCleanupMixin:
    def delete(self, using=None, keep_parents=False):
        if self.image and os.path.isfile(self.image.path):
            os.remove(self.image.path)
        super().delete(using, keep_parents)
