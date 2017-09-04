#!/bin/bash
action="sendMail"
userId="b.wathsala.bw@gmail.com"
accessToken="ya29.Glu6BMp-dqT0Qv7DAHpALWWjTk9cqXswuOVY8bKBA4AMPhd59dIMTkjvGdW-dW1LcMmAXp6z9hDlKsKqPlQiqpFFdYrw6rINt6AdJR33ljaKRLTv9v9_tCLq5wZa"
refreshToken="1/lq-I6zdb8qO98cPX2-Sbk2Wftw1nY8jvPxHZ2ExircAoptbwkmD7S_KTHXulGRqT"
clientId="822748394482-4k12ivqpdq5kfui478kgeuvc9ro9178o.apps.googleusercontent.com"
clientSecret="jZOAUUYBm3JFiBkbksZ4BaAy"

to="buddhik@wso2.com"
subject="Test Mail"
from="b.wathsala.bw@gmail.com"
messageBody="Hello Buddhi"
cc=" "
bcc=" "
id=" "
threadId=" "
echo $accessToken
ballerina run samples.bal $action $userId $accessToken $refreshToken $clientId $clientSecret $to $subject $from $messageBody $cc $bcc $id $threadId

