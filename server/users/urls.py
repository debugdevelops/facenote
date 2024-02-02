from django.urls import path
from users.views import UserDetail, UserList, InstrumentDetail, InstrumentList, resgistration_view, get_user, send_email_view
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urls import url

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/register/', resgistration_view),
    path('users/<int:pk>', UserDetail.as_view()),
    path('instruments/', InstrumentList.as_view()),
    path('instruments/<int:pk>', InstrumentDetail.as_view()),
    path('send-email/', send_email_view)
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
    path('users/login/', obtain_auth_token),
    path('users/get-user/', get_user)
]
