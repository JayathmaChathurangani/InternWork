#generate jwt
import jwt
import datetime

data = {
  "iss": "wso2.org/products/appm",
  "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=3600),
  "sub": "IS-WSO2.COM/buddhik@wso2.com@wso2internalstg",
  "Subject": "IS-WSO2.COM/buddhik@wso2.com@wso2internalstg",
  "aud": [
    "ECP-wso2internalstg-1.0",
    "carbonServer"
  ],
  "http://wso2.org/claims/emailaddress": "buddhik@wso2.com",
  "http://wso2.org/claims/role": "IS-WSO2.COM/wso2.interns,IS-WSO2.COM/wso2.shortterm-employees,IS-WSO2.COM/admin.engineering.profile.all.apps,Internal/everyone"
}

headers= {
  "typ": "JWT",
  "alg": "RS256",
  "x5t": "QzRBNjA2Mjk1NjBBQkQ3NUE3Mzg3QkQyMzEwMUE0QTdBMzQ0REJDNQ=="
}

encoded = jwt.encode(data, 'secret', algorithm='HS256',headers=headers)

print(encoded)

