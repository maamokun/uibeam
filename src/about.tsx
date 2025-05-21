import { NavLink } from "react-router";
import "./App.css";

function App() {
	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen w-11/12 md:w-full mx-auto py-10">
				<h1 className={"text-4xl font-bold text-center mb-4"}>ういビームボタンのあそび方！</h1>
				<p className={"text-lg text-center mt-5"}>その名の通り、ういビームを発射するだけのサービスです。</p>
				<p className={"text-lg text-center"}>
					誰かがういビームを発射すると、接続中のういビーマー全員に「発射されたよ」と通知が届きます。
				</p>
				<p className={"text-lg text-center"}>それと同時に、みんなのカウントが一つ増えます！</p>
				<div className={"flex flex-col md:flex-row items-center justify-center"}>
					<p className={"text-lg text-center"}>ただそれだけのサイトです。ういビームの音源を発見したら</p>
					<a
						href={"https://github.com/maamokun/uibeam/issues/new?title=ういビーム音源提供"}
						rel={"nofollow noopener"}
						target={"_blank"}
					>
						<button className={"btn btn-link text-lg"}>教えてね！</button>
					</a>
				</div>
				<NavLink to={"/"}>
					<button className="btn btn-link mt-5">
						<p className={"text-2xl"}>トップページに戻る</p>
					</button>
				</NavLink>
				<p className={"text-lg text-center mt-5"}>使用音源はこちらです</p>
				<a href={"https://youtu.be/CjMFy1uTNBs"} rel={"nofollow noopener"} target={"_blank"}>
					<button className={"btn btn-link text-md"}>
						誕生日なので絡みがほぼない人々に電話かける (2023/05/30)
					</button>
				</a>
				<a href={"https://youtu.be/uvo5hGK7F3U"} rel={"nofollow noopener"} target={"_blank"}>
					<button className={"btn btn-link text-md"}>
						お正月だから神にでもなるか【重大告知もする】 (2022/01/04)
					</button>
				</a>
				<a href={"https://youtu.be/r_L8A92zRNs"} rel={"nofollow noopener"} target={"_blank"}>
					<button className={"btn btn-link text-md"}>
						年末総決算！煩悩マシュマロ108本ノック (2022/12/30)
					</button>
				</a>
				<a href={"https://youtu.be/ycnsDoA9Q2s"} rel={"nofollow noopener"} target={"_blank"}>
					<button className={"btn btn-link text-md"}>
						しぐれうい選手によるマシュマロ高速百本ノック (2021/08/26)
					</button>
				</a>
			</div>
		</>
	);
}

export default App;
