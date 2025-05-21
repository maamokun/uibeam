import { useState, useEffect, useRef } from "react";
import uishig from "./assets/uishig.png";
import { PartySocket } from "partysocket";
import { NavLink } from "react-router";
import "./App.css";

import { FaXTwitter, FaGithub, FaChartLine } from "react-icons/fa6";

const beamSounds = ["/beams/1.mp3", "/beams/2.mp3", "/beams/3.mp3", "/beams/4.mp3"];

function App() {
	const [count, setCount] = useState(0);
	const [users, setUsers] = useState(0);
	const [sound, setSound] = useState(true);
	const [continuous, setContinuous] = useState(true);
	const [playing, setPlaying] = useState(false);
	const socketRef = useRef<PartySocket | null>(null);

	useEffect(() => {
		const socket = new PartySocket({
			host: "https://uibeam.maamokun.workers.dev",
			party: "uibeam-server",
			room: "beams",
		});
		socketRef.current = socket;

		const handler = (event: MessageEvent) => {
			try {
				const data = JSON.parse(event.data);
				if (typeof data.counter === "number") setCount(data.counter);
				if (typeof data.users === "number") setUsers(data.users);
			} catch {
				console.log("Invalid message format");
			}
		};
		socket.addEventListener("message", handler);

		return () => {
			socket.removeEventListener("message", handler);
			socket.close();
		};
	}, []);

	const uibeam = async () => {
		socketRef.current?.send("uibeam");
		if (sound) {
			if (!continuous && playing) {
				return;
			}
			setPlaying(true);
			const randomSound = beamSounds[Math.floor(Math.random() * beamSounds.length)];
			const audio = new Audio(randomSound);
			audio.play();
			audio.addEventListener("ended", () => {
				setPlaying(false);
			});
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen mx-auto w-11/12 md:w-full">
				<img src={uishig} alt="ういしぐ" className="rounded-full" width={75} height={75} />
				<div className="flex flex-col md:flex-row mt-5 items-center">
					<h2 className={"text-2xl font-yusei"}>ういビーム</h2>
					<h2 className={"text-2xl"}>を乱射できる画期的なサービス</h2>
				</div>
				<div className="flex flex-row mt-2 mb-5">
					<h2 className={"text-2xl font-yusei"}>ういビーム</h2>
					<h2 className={"text-2xl"}>ボタン</h2>
				</div>
				<div className="flex flex-row mt-2 mb-5">
					<h2 className={"text-md"}>現在の</h2>
					<h2 className={"font-yusei text-md"}>ういビーマー：</h2>
					<h2 className={"text-md"}>{users}人</h2>
				</div>
				<button onClick={uibeam} className="btn btn-info w-11/12 md:w-1/2 h-full py-5">
					<p className={"font-yusei text-3xl mdtext-6xl"}>ういビーム</p>
				</button>
				<div className="flex flex-row mt-5">
					<h2 className={"text-2xl"}>みんなで飛ばした</h2>
					<h2 className={"font-yusei text-2xl"}>ういビーム</h2>
				</div>
				{count === 0 ? (
					<p className={"font-pacifico text-6xl"}>...</p>
				) : (
					<h1 className={"font-pacifico text-6xl"}>{count}</h1>
				)}
				<div className={"flex flex-col md:flex-row gap-4 justify-center items-center mt-10"}>
					<a
						href={
							"https://x.com/intent/tweet?text=ういビームを乱射できる画期的なサービス！%0Aみんなも押してみてね！ういビーム！%0Ahttps%3A%2F%2Fuibi-mu.click%2F%0A%23ういビーム%0A%23しぐれうい%0A%23ういビームボタン"
						}
						rel={"nofollow noopener"}
						target={"_blank"}
					>
						<button className="btn btn-primary">
							<FaXTwitter className="" />
							で共有する
						</button>
					</a>
					<a href={"https://github.com/maamokun/uibeam"} rel={"nofollow noopener"} target={"_blank"}>
						<button className="btn btn-primary">
							<FaGithub className="" />
							ソースコード
						</button>
					</a>
					<a href={"https://analytics.mikandev.com/projects/Q8Kt5OMbfhHd"} rel={"nofollow noopener"} target={"_blank"}>
						<button className="btn btn-primary">
							<FaChartLine className="" />
							アクセス解析
						</button>
					</a>
				</div>
				<div className={"flex flex-row gap-4 items-center justify-center mt-5"}>
					<div className={"flex flex-row gap-2 items-center justify-center"}>
						<p className={"text-md"}>音を鳴らす</p>
						<input
							type="checkbox"
							checked={sound}
							className="toggle toggle-primary"
							onChange={() => setSound(!sound)}
						/>
					</div>
					<div className={"flex flex-row gap-2 items-center justify-center"}>
						<p className={"text-md"}>連続で鳴らす</p>
						<input
							type="checkbox"
							checked={continuous}
							className="toggle toggle-primary"
							onChange={() => setContinuous(!continuous)}
						/>
					</div>
				</div>
				<div className="flex flex-row mt-10">
					<h2 className={"text-md"}>ファンサイト(非公式)です。</h2>
					<h2 className={"font-yusei text-md"}>ういビーム！</h2>
				</div>
				<NavLink to={"/about"}>
					<button className="btn btn-link mt-5">
						<p className={"text-md"}>あそびかた・詳細情報</p>
					</button>
				</NavLink>
			</div>
		</>
	);
}

export default App;
