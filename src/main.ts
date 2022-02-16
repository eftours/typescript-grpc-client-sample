import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/greeter_service";
import { GreetRequest } from "../proto/greeter_service/GreetRequest";
import { GreetResponse } from "../proto/greeter_service/GreetResponse";

const proto = loadPackageDefinition(loadSync("./greeter_service.proto")) as unknown as ProtoGrpcType;
const greeterClient = new proto.greeter_service.GreeterService("0.0.0.0:50051", credentials.createInsecure());

const start = async () => {
	const greetRequest: GreetRequest = {
		name: "Justin",
		location: "MA",
	};
	const response = await greet(greetRequest);
	console.log(response);
}

const greet = (request: GreetRequest): Promise<GreetResponse> => {
	return new Promise((resolve, reject) => {
		greeterClient.Greet(request, (err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
}

start();
