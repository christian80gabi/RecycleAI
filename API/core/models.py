from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _


class MaterialCategory(models.TextChoices):
    PLASTIC = 'PLASTIC'
    METAL = 'METAL'
    WOOD = 'WOOD'
    FOOD = 'FOOD'
    PAPER = 'PAPER'
    RUBBER = 'RUBBER'
    LEATHER = 'LEATHER'
    TEXTILE = 'TEXTILE'
    GLASS = 'GLASS'
    CERAMIC = 'CERAMIC'
    CHEMICALS = 'CHEMICALS'
    STONE = 'STONE'
    BIOMATERIALS = 'BIOMATERIALS'
    POLYMER = 'POLYMER'
    OTHER = 'OTHER', _('OTHER')

    @property
    def _values():
        return [
            key for key, value in MaterialCategory.choices
        ]


class PointByMaterialCategory(models.IntegerChoices):
    PLASTIC = 100, _('PLASTIC')
    METAL = 75, _('METAL')
    WOOD = 60, _('WOOD')
    FOOD = 10, _('FOOD')
    PAPER = 70, _('PAPER')
    RUBBER = 150, _('RUBBER')
    LEATHER = 50, _('LEATHER')
    TEXTILE = 45, _('TEXTILE')
    GLASS = 80, _('GLASS')
    CERAMIC = 40, _('CERAMIC')
    CHEMICALS = 125, _('CHEMICALS')
    STONE = 2, _('STONE')
    BIOMATERIALS = 20, _('BIOMATERIALS')
    POLYMER = 25, _('POLYMER')
    OTHER = 5, _('OTHER')

    @property
    def _values():
        return [
            key for key, value in PointByMaterialCategory.choices
        ]

    @property
    def _point(material: str) -> int:
        for key, value in PointByMaterialCategory.choices:
            if value == material:
                return key

class AbstractModelBase(models.Model):
    reference = models.CharField(max_length=100, unique=True, blank=True)
    created_by = models.CharField(max_length=500, blank=True, editable=False)
    modified_by  = models.CharField(max_length=500, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = get_random_string(50)
        
        # self.modified_by = current_session_middleware.get_current_user()
        # if not self.created_by:
        #     self.created_by = current_session_middleware.get_current_user()
        
        super().save(*args, **kwargs)


class UserProfile(AbstractModelBase):
    user = models.OneToOneField(User, to_field='username', on_delete=models.CASCADE, blank=True)
    point = models.IntegerField(default=0, blank=True)


class Company(AbstractModelBase):
    name = models.CharField(max_length=500, blank=True)
    material_categories = models.CharField(max_length=500, blank=True, default=MaterialCategory.OTHER)

    @property
    def categories_verbose(self):     
        return [
            value for key, value in MaterialCategory.choices if key in self.material_categories
        ]
