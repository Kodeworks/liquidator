from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_yasg.utils import swagger_serializer_method

from base.serializers import LiquidatorSerializer
from .models import User, UserCompanyThrough


class UserCompanyThroughSerializer(LiquidatorSerializer):
    class Meta:
        model = UserCompanyThrough
        fields = ('user', 'company', 'role')


class UserSerializer(serializers.ModelSerializer):
    companies = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'companies')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    @swagger_serializer_method(serializers.ListField(child=UserCompanyThroughSerializer()))
    def get_companies(self, obj):
        return UserCompanyThroughSerializer(UserCompanyThrough.objects.filter(user=obj), many=True).data

    def create(self, validated_data):
        if 'password' in validated_data:
            user = super().create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
        else:
            raise ValidationError('Password is required')

        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
            user.save()

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text='The email')
    password = serializers.CharField(help_text='The password')


class UserTokenSerializer(serializers.Serializer):
    user = UserSerializer(help_text='The current user')
    refresh = serializers.CharField(help_text='The refresh token')
    access = serializers.CharField(help_text='The access token')
