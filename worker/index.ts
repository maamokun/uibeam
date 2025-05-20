import { routePartykitRequest, Server } from "partyserver";

export class MyServer extends Server {
	counter: number = 0;

	async onConnect(connection: any) {
		const count = await this.ctx.storage.get("counter");
		connection.send(
			JSON.stringify({ counter: typeof count === "string" ? JSON.parse(count) : 0 })
		);
	}

	onMessage(connection: any, message: any) {
		this.counter++;
		this.broadcast(JSON.stringify({ counter: this.counter }));
		this.ctx.storage.put("counter", JSON.stringify(this.counter));
	}
}

export const uibeam_server = MyServer;

export default {
	fetch(request: Request, env: any) {
		return routePartykitRequest(request, env) || new Response("Not Found", { status: 404 });
	},
};
