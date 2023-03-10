from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    """Custom user manager."""

    def create_user(self, email, password=None, **other):
        """Create and return a user."""

        if not email:
            raise ValueError("Email is required.")
        user = self.model(email=self.normalize_email(email), **other)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):

        """Create and return a superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model."""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    text = models.TextField(max_length=5000)

    image_url = models.ImageField(upload_to="posts", null=True, blank=True)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=True, related_name="comments"
    )
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=500)


class Like(models.Model):
    """Like model for posts and comments."""

    author = models.OneToOneField(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, null=True, related_name="likes"
    )
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, null=True, related_name="likes"
    )
