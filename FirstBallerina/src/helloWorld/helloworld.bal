package src.helloWorld;

import ballerina.lang.system;

function main (string[] args) {

    int q;
    int r;
    system:println(q);

    q,r = divideByTen(23);
    system:println(q);
    system:println(r);

}
