import { routePartykitRequest, Server } from "partyserver";

export class MyServer extends Server {
	counter: number = 0;

	onConnect(connection: any) {
		connection.send(JSON.stringify({ counter: this.counter }));
	}

	onMessage(connection: any, message: any) {
		this.counter++;
		this.broadcast(JSON.stringify({ counter: this.counter }));
	}
}

export const uibeam_server = MyServer;

export default {
	fetch(request: Request, env: any) {
		return routePartykitRequest(request, env) || new Response("Not Found", { status: 404 });
	},
};
