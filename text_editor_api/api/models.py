from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, notifications, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            notifications=notifications,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, notifications, password=None):
        if not email:
            raise ValueError('Admin must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            notifications=notifications,
        )
        user.is_admin = True
        user.set_password(password)
        user.save(using=self._db)
        return user


def image_path(instance, filename):
    return '/'.join(['profile', filename])


class User(AbstractBaseUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
    image = models.ImageField(upload_to=image_path, blank=True, null=True)
    notifications = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'notifications']

    def __str__(self):
        return f'{self.email}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)
    extension = models.CharField(max_length=10, unique=True)
    judge0_id = models.IntegerField(unique=True, null=False, blank=False)
    mode = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return f'{self.name}'


class Theme(models.Model):
    name = models.CharField(max_length=50, unique=True)
    link = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'


class Code(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.RESTRICT)
    public = models.BooleanField(default=True)
    code = models.TextField(blank=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.code}'
