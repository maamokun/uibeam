import { routePartykitRequest, Server } from "partyserver";

export class MyServer extends Server {
	counter: number = 0;
	connections: Set<any> = new Set();

 static Options = {
     hibernate: true
 };

	async onConnect(connection: any) {
		this.connections.add(connection);
		if (this.counter === 0) {
			const stored = await this.ctx.storage.get("counter");
			this.counter = typeof stored === "string" ? JSON.parse(stored) : 0;
		}
		connection.send(JSON.stringify({ counter: this.counter, users: this.connections.size }));
		this.broadcast(JSON.stringify({ users: this.connections.size }));
	}

	onMessage(connection: any, message: any) {
		this.counter++;
		this.broadcast(JSON.stringify({ counter: this.counter }));
		this.ctx.storage.put("counter", JSON.stringify(this.counter));
	}

	onClose(connection: any) {
		this.connections.delete(connection);
		this.broadcast(JSON.stringify({ users: this.connections.size }));
	}
}

export const uibeam_server = MyServer;

export default {
	fetch(request: Request, env: any) {
		return routePartykitRequest(request, env) || new Response("Not Found", { status: 404 });
	},
};
