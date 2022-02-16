import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/greeter_service";
import { GreetRequest } from "../proto/greeter_service/GreetRequest";

const proto = loadPackageDefinition(loadSync("./greeter_service.proto")) as unknown as ProtoGrpcType;
const greeterClient = new proto.greeter_service.GreeterService("0.0.0.0:50051", credentials.createInsecure());

const greetRequest: GreetRequest = {
	name: "Justin",
	location: "MA",
};

greeterClient.Greet(greetRequest, (err, response) => {
	if (err) {
		console.error(err);
	} else {
		console.log(response.greeting);
	}
});
