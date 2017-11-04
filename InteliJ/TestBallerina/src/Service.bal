package src;
import ballerina.net.http;


@http:configuration {basePath:"/hello"}
service<http> helloWorld {

    @http:resourceConfig {
        methods:["GET"],
        path:"/"
    }
    resource sayHello (http:Request req, http:Response resp) {
        println("HHee");
        http:ClientConnector locationEP;
        http:Request newRequest = {};
        http:Response clientResponse = {};

        locationEP = create http:ClientConnector("https://admin:admin@localhost:9445", {});

        clientResponse = locationEP.get("/bpmn/runtime/process-instances/s", newRequest);

        resp.forward(clientResponse);
    }

}