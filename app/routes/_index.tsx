import {
	ClientActionFunctionArgs,
	Form,
	json,
	useActionData,
} from "@remix-run/react";
import { invoke } from "@tauri-apps/api";
import ConfettiExplosion from "react-confetti-explosion";

export async function clientAction({ request }: ClientActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") || "";
	const greeting = await invoke("greet", {
		name,
	});
	return json({ greeting });
}

export default function Index() {
	const actionData = useActionData();
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>Remix (SPA Mode) ❤️ Tauri</h1>
			<Form
				method="POST"
				style={{
					display: "flex",
					gap: 10,
				}}
			>
				<label>
					Name <input type="text" name="name" />
				</label>
				<button type="submit">Greet</button>
			</Form>
			{actionData?.greeting && (
				<>
					<ConfettiExplosion />
					<p>{actionData.greeting}</p>
				</>
			)}
		</div>
	);
}
