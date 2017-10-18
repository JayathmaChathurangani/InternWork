#generate jwt
import jwt
import datetime

mail1 = "buddhik@wso2.com"
mail2 = "ishika@wso2.com"
mail3 = "b.wathsala.bw@gmail.com"

mail = mail3
print(mail)
data = {
  "iss": "wso2.org/products/appm",
  "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=3600),
  "sub": "IS-WSO2.COM/"+mail+"@wso2internalstg",
  "Subject": "IS-WSO2.COM/"+mail+"@wso2internalstg",
  "aud": [
    "ECP-wso2internalstg-1.0",
    "carbonServer"
  ],
  "http://wso2.org/claims/emailaddress": mail,
  "http://wso2.org/claims/role": "IS-WSO2.COM/wso2.interns,IS-WSO2.COM/wso2.shortterm-employees,IS-WSO2.COM/admin.engineering.profile.all.apps,Internal/everyone"
}

headers= {
  "typ": "JWT",
  "alg": "RS256",
  "x5t": "QzRBNjA2Mjk1NjBBQkQ3NUE3Mzg3QkQyMzEwMUE0QTdBMzQ0REJDNQ=="
}

encoded = jwt.encode(data, 'secret', algorithm='HS256',headers=headers)

print(encoded)

